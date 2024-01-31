import { builder } from '../builder';
import { Comment } from './Comment';
import { Post } from './Post';

builder.prismaObject('User', {
	fields: (t) => ({
		id: t.exposeID('id'),
		email: t.exposeString('email'),
		name: t.expose('name', {
			type: 'String',
			nullable: true,
		}),
		displayName: t.expose('displayName', {
			type: 'String',
			nullable: true,
		}),
		about: t.expose('about', {
			type: 'String',
			nullable: true,
		}),
		image: t.expose('image', {
			type: 'String',
			nullable: true,
		}),
		votes: t.relation('votes'),
		comments: t.relation('comments'),
		posts: t.relation('posts'),
	}),
});

builder.mutationField('updateUser', (t) =>
	t.prismaField({
		type: 'User',
		args: {
			name: t.arg.string(),
			displayName: t.arg.string(),
			about: t.arg.string(),
			image: t.arg.string(),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in');
			}

			const { displayName, about, image, name } = args;

			const user = await ctx.prisma.user.update({
				...query,
				where: {
					id: ctx.session.user.id,
				},
				data: {
					name: name ?? undefined,
					displayName,
					about,
					image,
				},
			});

			return user;
		},
	})
);

const OverviewItem = builder.unionType('overviewItem', {
	types: [Post, Comment],
	resolveType(item) {
		if ('title' in item) {
			return Post;
		}
		if ('postId' in item) {
			return Comment;
		}
	},
});

builder.queryField('overview', (t) =>
	t.connection({
		type: OverviewItem,
		args: {
			name: t.arg.string({ required: true }),
		},
		resolve: async (_parent, args, ctx) => {
			const first = args.first ? args.first + 1 : 11;

			const user = await ctx.prisma.user.findUnique({
				where: {
					name: args.name,
				},
				include: {
					posts: {
						take: first,
						...(args.after
							? { where: { createdAt: { lt: args.after } } }
							: undefined),
						orderBy: {
							createdAt: 'desc',
						},
					},
					comments: {
						take: first,
						...(args.after
							? { where: { createdAt: { lt: args.after } } }
							: undefined),
						orderBy: {
							createdAt: 'desc',
						},
					},
				},
			});

			if (!user) {
				throw new Error('No user found');
			}

			const postsAndComments = [...user.posts, ...user.comments].sort(
				(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
			);

			const hasNextPage = postsAndComments.length > first - 1;
			const hasPreviousPage = !!args.after;

			const nodes = postsAndComments.slice(0, first - 1);

			const startCursor =
				nodes.length > 0 ? nodes[0].createdAt.toISOString() : null;
			const endCursor =
				nodes.length > 0
					? nodes[nodes.length - 1].createdAt.toISOString()
					: null;

			return {
				edges: nodes.map((node) => ({
					cursor: node.createdAt.toISOString(),
					node,
				})),
				pageInfo: {
					hasNextPage,
					hasPreviousPage,
					endCursor,
					startCursor,
				},
			};
		},
	})
);
