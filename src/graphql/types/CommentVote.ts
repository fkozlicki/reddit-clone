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
		type: ['CommentVote'],
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
					await ctx.prisma.commentVote.delete({
						...query,
						where: {
							id: existingVote.id,
						},
					});
				} else {
					await ctx.prisma.commentVote.update({
						...query,
						where: {
							id: existingVote.id,
						},
						data: {
							value: args.value,
						},
					});
				}
			} else {
				await ctx.prisma.commentVote.create({
					...query,
					data: {
						value: args.value,
						commentId: args.commentId,
						userId: ctx.session.user.id,
					},
				});
			}

			const votes = await ctx.prisma.commentVote.findMany({
				where: {
					commentId: args.commentId,
				},
			});

			return votes;
		},
	})
);
