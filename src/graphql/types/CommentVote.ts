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

builder.mutationField('voteComment', (t) =>
	t.prismaField({
		type: 'Comment',
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

			const comment = await ctx.prisma.comment.update({
				...query,
				where: {
					id: args.commentId,
				},
				data: {
					votes: action,
				},
			});

			return comment;
		},
	})
);
