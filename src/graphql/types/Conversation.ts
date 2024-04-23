import { builder } from '../builder';
import { Message } from './Message';

export const Conversation = builder.prismaObject('Conversation', {
	fields: (t) => ({
		id: t.exposeID('id'),
		messages: t.relation('messages'),
		participants: t.relation('participants'),
		lastMessage: t.field({
			type: Message,
			resolve: async (parent, args, ctx) => {
				const lastMessage = await ctx.prisma.message.findFirst({
					where: {
						conversationId: parent.id,
					},
					orderBy: {
						createdAt: 'desc',
					},
				});
				return lastMessage!;
			},
		}),
	}),
});

builder.mutationField('createConversation', (t) =>
	t.prismaField({
		type: 'Conversation',
		args: {
			userId: t.arg.string({ required: true }),
		},
		resolve: async (query, parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('Auth required');
			}

			const conversation = await ctx.prisma.conversation.create({
				...query,
				data: {
					participants: {
						connect: [{ id: args.userId }, { id: ctx.session.user.id }],
					},
				},
			});

			return conversation;
		},
	})
);

builder.queryField('conversations', (t) =>
	t.prismaField({
		type: ['Conversation'],
		resolve: async (query, parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('Auth required');
			}

			const conversations = await ctx.prisma.conversation.findMany({
				...query,
				where: {
					participants: {
						some: {
							id: ctx.session.user.id,
						},
					},
				},
			});

			return conversations;
		},
	})
);
