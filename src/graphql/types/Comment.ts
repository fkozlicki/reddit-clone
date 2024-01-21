import { builder } from '../builder';
import { AuthorFilter } from './Post';

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

const CommentFilter = builder.prismaWhere('Comment', {
	fields: {
		author: AuthorFilter,
	},
});

builder.queryField('comments', (t) =>
	t.prismaField({
		type: ['Comment'],
		args: {
			filter: t.arg({ type: CommentFilter }),
		},
		resolve: async (query, _parent, args, ctx) => {
			const comments = await ctx.prisma.comment.findMany({
				...query,
				where: args.filter ?? undefined,
			});

			return comments;
		},
	})
);
