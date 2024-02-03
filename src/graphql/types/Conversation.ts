import { builder } from '../builder';
import { User } from './User';

export const Conversation = builder.prismaObject('Conversation', {
	fields: (t) => ({
		id: t.exposeID('id'),
		message: t.relation('messages'),
		participants: t.relation('participants'),
		receiver: t.field({
			type: User,
			select: {
				participants: true,
			},
			resolve: (conversation, args, ctx) =>
				conversation.participants.find(
					(user) => user.id !== ctx.session?.user.id
				)!,
		}),
	}),
});
