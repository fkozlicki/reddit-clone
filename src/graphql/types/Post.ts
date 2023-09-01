import { builder } from '../builder';

builder.prismaObject('Post', {
	fields: (t) => ({
		id: t.exposeID('id'),
		title: t.exposeString('title'),
		content: t.exposeString('content'),
		createdAt: t.expose('createdAt', {
			type: 'Date',
		}),
		votes: t.relation('votes'),
		author: t.relation('author'),
		comments: t.relation('comments'),
		community: t.relation('community'),
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

const CommunityWhere = builder.prismaWhere('Community', {
	fields: {
		name: 'String',
		topic: builder.prismaWhere('Topic', {
			fields: {
				name: 'String',
			},
		}),
	},
});

const PostFilter = builder.prismaWhere('Post', {
	fields: {
		community: CommunityWhere,
		author: builder.prismaWhere('User', {
			fields: {
				name: 'String',
			},
		}),
	},
});

const PostSort = builder.enumType('PostSort', {
	values: ['hot', 'top', 'new'],
});

builder.queryField('posts', (t) =>
	t.prismaField({
		type: ['Post'],
		args: {
			offset: t.arg.int({
				defaultValue: 0,
				required: true,
			}),
			limit: t.arg.int({
				defaultValue: 5,
				required: true,
			}),
			filter: t.arg({
				type: PostFilter,
			}),
			sort: t.arg({
				type: PostSort,
			}),
		},
		resolve: async (query, _parent, args, ctx) => {
			const { offset, limit, filter, sort } = args;

			const posts = await ctx.prisma.post.findMany({
				...query,
				skip: offset,
				take: limit,
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
