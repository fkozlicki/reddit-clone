import { builder } from '../builder';

export const Message = builder.prismaObject('Message', {
	fields: (t) => ({
		id: t.exposeID('id'),
		content: t.exposeString('content'),
		author: t.relation('author'),
		createdAt: t.expose('createdAt', {
			type: 'Date',
		}),
	}),
});

builder.mutationField('createMessage', (t) =>
	t.prismaField({
		type: 'Message',
		args: {
			receiverId: t.arg.string({ required: true }),
			content: t.arg.string({ required: true }),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in');
			}

			const { content, receiverId } = args;

			const receiver = await ctx.prisma.user.findUnique({
				where: {
					id: receiverId,
				},
			});

			if (!receiver) {
				throw new Error('Reveiver does not exist');
			}

			let converation;

			const existingConversation = await ctx.prisma.conversation.findFirst({
				where: {
					AND: [
						{ participants: { some: { id: receiverId } } },
						{ participants: { some: { id: ctx.session.user.id } } },
					],
				},
			});

			if (existingConversation) {
				converation = existingConversation;
			} else {
				const newConversation = await ctx.prisma.conversation.create({
					data: {
						participants: {
							connect: [
								{
									id: receiverId,
								},
								{ id: ctx.session.user.id },
							],
						},
					},
				});
				converation = newConversation;
			}

			const message = await ctx.prisma.message.create({
				...query,
				data: {
					authorId: ctx.session.user.id,
					content,
					conversationId: converation.id,
				},
			});

			ctx.pubsub.publish('NEW_MESSAGE', message);

			return message;
		},
	})
);

builder.subscriptionField('message', (t) =>
	t.prismaField({
		type: 'Message',
		subscribe: (root, args, ctx) => ctx.pubsub.subscribe('NEW_MESSAGE'),
		resolve: (query, parent, args, ctx) => {
			return parent;
		},
	})
);
