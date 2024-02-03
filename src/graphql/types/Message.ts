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

builder.queryField('message', (t) =>
	t.prismaField({
		type: ['Message'],
		smartSubscription: true,
		subscribe(subscriptions, parent, args, context, info) {},
		resolve: async (query, parent, args, ctx) => {
			return await ctx.prisma.message.findMany();
		},
	})
);
