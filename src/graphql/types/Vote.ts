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

builder.mutationField('makeVote', (t) =>
	t.prismaField({
		type: 'Vote',
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

			if (existingVote) {
				if (existingVote.value === args.value) {
					const deletedVote = await ctx.prisma.vote.delete({
						...query,
						where: {
							id: existingVote.id,
						},
					});

					return deletedVote;
				} else {
					const updatedVote = await ctx.prisma.vote.update({
						...query,
						where: {
							id: existingVote.id,
						},
						data: {
							value: args.value,
						},
					});

					return updatedVote;
				}
			} else {
				const newVote = await ctx.prisma.vote.create({
					...query,
					data: {
						value: args.value,
						postId: args.postId,
						userId: ctx.session.user.id,
					},
				});

				return newVote;
			}
		},
	})
);
