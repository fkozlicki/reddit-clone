import { builder } from '../builder';

builder.prismaObject('CommentVote', {
	fields: (t) => ({
		id: t.exposeID('id'),
		value: t.exposeInt('value'),
		user: t.relation('user'),
		userId: t.exposeString('userId'),
		comment: t.relation('comment'),
		commentId: t.exposeString('commentId'),
	}),
});

builder.mutationField('makeCommentVote', (t) =>
	t.prismaField({
		type: 'CommentVote',
		args: {
			value: t.arg.int({ required: true }),
			commentId: t.arg.string({ required: true }),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in.');
			}

			const existingVote = await ctx.prisma.commentVote.findFirst({
				where: {
					userId: ctx.session.user.id,
					commentId: args.commentId,
				},
			});

			if (existingVote) {
				if (existingVote.value === args.value) {
					const deletedVote = await ctx.prisma.commentVote.delete({
						...query,
						where: {
							id: existingVote.id,
						},
					});

					return deletedVote;
				} else {
					const updatedVote = await ctx.prisma.commentVote.update({
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
				const newVote = await ctx.prisma.commentVote.create({
					...query,
					data: {
						value: args.value,
						commentId: args.commentId,
						userId: ctx.session.user.id,
					},
				});

				return newVote;
			}
		},
	})
);
