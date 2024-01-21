import { builder } from '../builder';
import { CommunityWhere } from './Community';

const CommentWhere = builder.inputType('CommentWhere', {
	fields: (t) => ({
		replyToId: t.string({}),
	}),
});

export const Post = builder.prismaObject('Post', {
	fields: (t) => ({
		id: t.exposeID('id'),
		title: t.exposeString('title'),
		content: t.exposeString('content'),
		createdAt: t.expose('createdAt', {
			type: 'Date',
		}),
		votes: t.relation('votes'),
		author: t.relation('author'),
		comments: t.relation('comments', {
			args: {
				where: t.arg({ type: CommentWhere }),
			},
			query: (args) => ({
				where: { replyToId: args.where?.replyToId },
			}),
		}),
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

export const AuthorFilter = builder.prismaWhere('User', {
	fields: {
		name: 'String',
	},
});

const PostVoteFilter = builder.prismaWhere('Vote', {
	fields: {
		value: 'Int',
		user: AuthorFilter,
	},
});

const PostVoteListFilter = builder.prismaListFilter(PostVoteFilter, {
	ops: ['every', 'some', 'none'],
});

const PostFilter = builder.prismaWhere('Post', {
	fields: {
		community: CommunityWhere,
		author: AuthorFilter,
		votes: PostVoteListFilter,
	},
});

const PostSort = builder.enumType('PostSort', {
	values: ['hot', 'top', 'new'],
});

builder.queryField('posts', (t) =>
	t.prismaConnection({
		type: 'Post',
		cursor: 'id',
		args: {
			filter: t.arg({
				type: PostFilter,
			}),
			sort: t.arg({
				type: PostSort,
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
