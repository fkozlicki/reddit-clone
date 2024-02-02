import { CommentFilter, Sort, builder } from '../builder';

export const Comment = builder.prismaObject('Comment', {
	fields: (t) => ({
		id: t.exposeID('id'),
		content: t.exposeString('content'),
		createdAt: t.expose('createdAt', {
			type: 'Date',
		}),
		author: t.relation('author'),
		post: t.relation('post'),
		votes: t.relation('votes'),
		replies: t.relation('replies'),
		postId: t.exposeString('postId'),
		voteValue: t.int({
			resolve: async (parent, args, ctx) => {
				if (!ctx.session) {
					return null;
				}

				return (
					(
						await ctx.prisma.commentVote.findFirst({
							where: { commentId: parent.id, userId: ctx.session.user.id },
						})
					)?.value ?? null
				);
			},
			nullable: true,
		}),
		karma: t.int({
			resolve: async (parent, args, ctx) => {
				const upVotesCount = await ctx.prisma.commentVote.count({
					where: { commentId: parent.id, value: 1 },
				});
				const downVotesCount = await ctx.prisma.commentVote.count({
					where: { commentId: parent.id, value: -1 },
				});

				return upVotesCount + downVotesCount * -1;
			},
		}),
	}),
});

builder.mutationField('createComment', (t) =>
	t.prismaField({
		type: 'Comment',
		args: {
			postId: t.arg.string({ required: true }),
			content: t.arg.string({ required: true }),
			replyToId: t.arg.string(),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('you have to be logged in');
			}

			const comment = await ctx.prisma.comment.create({
				...query,
				data: {
					content: args.content,
					postId: args.postId,
					authorId: ctx.session.user.id,
					replyToId: args.replyToId,
				},
			});

			return comment;
		},
	})
);

builder.queryField('comments', (t) =>
	t.prismaConnection({
		type: 'Comment',
		cursor: 'id',
		args: {
			filter: t.arg({ type: CommentFilter }),
			sort: t.arg({ type: Sort }),
		},
		resolve: async (query, _parent, args, ctx) => {
			const comments = await ctx.prisma.comment.findMany({
				...query,
				where: args.filter ?? undefined,
				orderBy: args.sort === 'new' ? { createdAt: 'desc' } : undefined,
			});

			return comments;
		},
	})
);
