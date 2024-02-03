import { builder } from '../builder';

builder.prismaObject('Topic', {
	fields: (t) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		slug: t.exposeString('slug'),
		communities: t.relation('communities'),
	}),
});

builder.queryField('topics', (t) =>
	t.prismaField({
		type: ['Topic'],
		resolve: async (query, _parent, _args, ctx) => {
			return await ctx.prisma.topic.findMany({
				...query,
			});
		},
	})
);
