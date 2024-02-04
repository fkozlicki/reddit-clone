import { CommentFilter, PostFilter, Sort, builder } from '../builder';

export const Post = builder.prismaObject('Post', {
	fields: (t) => ({
		id: t.exposeID('id'),
		title: t.exposeString('title'),
		content: t.exposeString('content'),
		createdAt: t.expose('createdAt', {
			type: 'Date',
		}),
		author: t.relation('author'),
		comments: t.relation('comments', {
			args: {
				filter: t.arg({ type: CommentFilter }),
				sort: t.arg({ type: Sort }),
			},
			query: (args) => ({
				where: { replyToId: args.filter?.replyToId, id: args.filter?.id },
				orderBy: args.sort === 'new' ? { createdAt: 'desc' } : undefined,
			}),
		}),
		commentsCount: t.relationCount('comments'),
		community: t.relation('community'),
		voteValue: t.int({
			resolve: async (parent, _args, ctx) => {
				if (!ctx.session) {
					return null;
				}

				return (
					(
						await ctx.prisma.vote.findFirst({
							where: { postId: parent.id, userId: ctx.session.user.id },
						})
					)?.value ?? null
				);
			},
			nullable: true,
		}),
		saved: t.boolean({
			resolve: async (parent, _args, ctx) => {
				if (!ctx.session) {
					return false;
				}
				return await ctx.prisma.savedPost
					.findFirst({
						where: { postId: parent.id, userId: ctx.session.user.id },
					})
					.then(Boolean);
			},
		}),
		karma: t.int({
			resolve: async (parent, args, ctx) => {
				const upVotesCount = await ctx.prisma.vote.count({
					where: { postId: parent.id, value: 1 },
				});
				const downVotesCount = await ctx.prisma.vote.count({
					where: { postId: parent.id, value: -1 },
				});

				return upVotesCount + downVotesCount * -1;
			},
		}),
	}),
});

builder.mutationField('createPost', (t) =>
	t.prismaField({
		type: 'Post',
		args: {
			title: t.arg.string({ required: true }),
			content: t.arg.string({ required: true }),
			communityId: t.arg.string({ required: true }),
		},
		resolve: async (query, _parent, args, ctx) => {
			const { title, content, communityId } = args;

			if (!ctx.session) {
				throw new Error('You have to be logged in');
			}

			const post = await ctx.prisma.post.create({
				...query,
				data: {
					title,
					content,
					communityId,
					authorId: ctx.session.user.id,
				},
			});

			return post;
		},
	})
);

builder.queryField('posts', (t) =>
	t.prismaConnection({
		type: 'Post',
		cursor: 'id',
		args: {
			filter: t.arg({
				type: PostFilter,
			}),
			sort: t.arg({
				type: Sort,
			}),
		},
		resolve: async (query, _parent, args, ctx) => {
			const { filter, sort } = args;

			const posts = await ctx.prisma.post.findMany({
				...query,
				where: filter ?? undefined,
				orderBy: sort
					? sort === 'hot'
						? {
								comments: {
									_count: 'desc',
								},
						  }
						: sort === 'top'
						? {
								votes: {
									_count: 'desc',
								},
						  }
						: {
								createdAt: 'desc',
						  }
					: undefined,
			});

			return posts;
		},
	})
);

builder.queryField('post', (t) =>
	t.prismaField({
		type: 'Post',
		args: {
			id: t.arg.string({
				required: true,
			}),
		},
		resolve: async (query, _parent, args, ctx) => {
			const post = await ctx.prisma.post.findUnique({
				...query,
				where: {
					id: args.id,
				},
			});

			if (!post) {
				throw new Error('There is not post with id ' + args.id);
			}

			return post;
		},
	})
);

builder.mutationField('save', (t) =>
	t.prismaField({
		type: 'Post',
		args: {
			id: t.arg.string({
				required: true,
			}),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in');
			}

			const post = await ctx.prisma.post.findUnique({
				where: {
					id: args.id,
				},
			});

			if (!post) {
				throw new Error('Post not found');
			}

			const userId = ctx.session.user.id;

			const savedPost = await ctx.prisma.savedPost.findFirst({
				where: { postId: args.id, userId },
			});

			const operation = !!savedPost
				? { delete: { postId_userId: { postId: args.id, userId } } }
				: { create: { userId } };

			const updated = await ctx.prisma.post.update({
				...query,
				where: {
					id: args.id,
				},
				data: {
					saved: operation,
				},
			});

			return updated;
		},
	})
);
