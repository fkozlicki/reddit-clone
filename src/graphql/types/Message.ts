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

builder.queryField('messages', (t) =>
	t.prismaConnection({
		type: 'Message',
		cursor: 'id',
		args: {
			conversationId: t.arg.string({ required: true }),
			after: t.arg.string(),
		},
		resolve: async (query, parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('Auth required');
			}

			const messages = ctx.prisma.message.findMany({
				...query,
				where: {
					conversation: {
						id: args.conversationId,
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			});

			return messages;
		},
	})
);

builder.mutationField('createMessage', (t) =>
	t.prismaField({
		type: 'Message',
		args: {
			conversationId: t.arg.string({ required: true }),
			content: t.arg.string({ required: true }),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in');
			}

			const { content, conversationId } = args;

			const conversation = await ctx.prisma.conversation.findUnique({
				where: {
					id: conversationId,
				},
				include: {
					participants: true,
				},
			});

			if (!conversation) {
				throw new Error('Not found');
			}

			const message = await ctx.prisma.message.create({
				...query,
				data: {
					authorId: ctx.session.user.id,
					content,
					conversationId,
				},
			});

			// send to conversation
			ctx.pubsub.publish('coversation:messages', conversationId, message);

			// send to every user
			conversation.participants.forEach((member) => {
				ctx.pubsub.publish('user:message', member.id, message);
			});

			return message;
		},
	})
);

builder.subscriptionField('message', (t) =>
	t.prismaField({
		type: 'Message',
		args: {
			conversationId: t.arg.string({ required: true }),
		},
		subscribe: (root, args, ctx) =>
			ctx.pubsub.subscribe('coversation:messages', args.conversationId),
		resolve: (query, parent, args, ctx) => {
			return parent;
		},
	})
);
