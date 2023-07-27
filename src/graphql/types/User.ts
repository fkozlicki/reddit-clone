import { builder } from '../builder';

builder.prismaObject('User', {
	fields: (t) => ({
		id: t.exposeID('id'),
		email: t.exposeString('email'),
		name: t.expose('name', {
			type: 'String',
			nullable: true,
		}),
		displayName: t.expose('displayName', {
			type: 'String',
			nullable: true,
		}),
		image: t.expose('image', {
			type: 'String',
			nullable: true,
		}),
		votes: t.relation('votes'),
		comments: t.relation('comments'),
		communities: t.relation('communities'),
		posts: t.relation('posts'),
	}),
});

builder.queryField('user', (t) =>
	t.prismaField({
		type: 'User',
		resolve: async (query, _parent, _args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in');
			}

			const user = await ctx.prisma.user.findFirst({
				...query,
				where: {
					id: ctx.session.user.id,
				},
			});

			if (!user) {
				throw new Error('User does not exists');
			}

			return user;
		},
	})
);

builder.mutationField('updateUser', (t) =>
	t.prismaField({
		type: 'User',
		args: {
			name: t.arg.string(),
			displayName: t.arg.string(),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in');
			}

			const user = await ctx.prisma.user.update({
				...query,
				where: {
					id: ctx.session.user.id,
				},
				data: {
					name: args.name,
					displayName: args.displayName,
				},
			});

			return user;
		},
	})
);
