import { builder } from '../builder';

builder.prismaObject('Community', {
	fields: (t) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		members: t.relation('members'),
		posts: t.relation('posts'),
		topic: t.relation('topic', {
			nullable: true,
		}),
		createdAt: t.expose('createdAt', {
			type: 'Date',
		}),
		description: t.expose('description', {
			type: 'String',
			nullable: true,
		}),
		moderators: t.relation('moderators'),
	}),
});

builder.queryField('community', (t) =>
	t.prismaField({
		type: 'Community',
		args: {
			name: t.arg.string({ required: true }),
		},
		resolve: async (query, _parent, args, ctx) => {
			const community = await ctx.prisma.community.findUnique({
				...query,
				where: {
					name: args.name,
				},
			});

			if (!community) {
				throw new Error('Couldnt find community');
			}

			return community;
		},
	})
);

builder.mutationField('createCommunity', (t) =>
	t.prismaField({
		type: 'Community',
		args: {
			name: t.arg.string({ required: true }),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in.');
			}

			const { name } = args;

			const community = await ctx.prisma.community.create({
				...query,
				data: {
					name,
					members: {
						connect: {
							id: ctx.session.user.id,
						},
					},
					moderators: {
						connect: {
							id: ctx.session.user.id,
						},
					},
				},
			});

			if (!community) {
				throw new Error('Couldnt create community.');
			}

			return community;
		},
	})
);

builder.mutationField('updateCommunity', (t) =>
	t.prismaField({
		type: 'Community',
		args: {
			name: t.arg.string({ required: true }),
			newName: t.arg.string(),
			description: t.arg.string(),
			topicId: t.arg.string(),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in.');
			}

			const { name, newName, description, topicId } = args;

			const community = await ctx.prisma.community.update({
				...query,
				where: {
					name,
				},
				data: {
					name: newName ?? undefined,
					description,
					topicId,
				},
			});

			if (!community) {
				throw new Error('Couldnt update community.');
			}

			return community;
		},
	})
);

builder.mutationField('joinCommunity', (t) =>
	t.prismaField({
		type: 'Community',
		args: {
			name: t.arg.string({ required: true }),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in.');
			}

			const { name } = args;

			const community = await ctx.prisma.community.update({
				...query,
				where: {
					name,
				},
				data: {
					members: {
						connect: {
							id: ctx.session.user.id,
						},
					},
				},
			});

			if (!community) {
				throw new Error('Couldnt update community.');
			}

			return community;
		},
	})
);

builder.mutationField('leaveCommunity', (t) =>
	t.prismaField({
		type: 'Community',
		args: {
			name: t.arg.string({ required: true }),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in.');
			}

			const { name } = args;

			const community = await ctx.prisma.community.update({
				...query,
				where: {
					name,
				},
				data: {
					members: {
						disconnect: {
							id: ctx.session.user.id,
						},
					},
				},
			});

			if (!community) {
				throw new Error('Couldnt update community.');
			}

			return community;
		},
	})
);
