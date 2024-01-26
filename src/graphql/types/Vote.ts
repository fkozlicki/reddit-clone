import { builder } from '../builder';

builder.prismaObject('Vote', {
	fields: (t) => ({
		id: t.exposeID('id'),
		value: t.exposeInt('value'),
		user: t.relation('user'),
		post: t.relation('post'),
		userId: t.exposeString('userId'),
		postId: t.exposeString('postId'),
	}),
});

builder.mutationField('votePost', (t) =>
	t.prismaField({
		type: 'Post',
		args: {
			value: t.arg.int({ required: true }),
			postId: t.arg.string({ required: true }),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in.');
			}

			const existingVote = await ctx.prisma.vote.findFirst({
				where: {
					userId: ctx.session.user.id,
					postId: args.postId,
				},
			});

			const action = existingVote
				? existingVote.value === args.value
					? { delete: { id: existingVote.id } }
					: {
							update: {
								where: { id: existingVote.id },
								data: { value: args.value },
							},
					  }
				: { create: { userId: ctx.session.user.id, value: args.value } };

			const post = await ctx.prisma.post.update({
				...query,
				where: {
					id: args.postId,
				},
				data: {
					votes: action,
				},
			});

			return post;
		},
	})
);
