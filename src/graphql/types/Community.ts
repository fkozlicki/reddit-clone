import { CommunityWhere, builder } from '../builder';

builder.prismaObject('Community', {
	fields: (t) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		image: t.expose('image', {
			type: 'String',
			nullable: true,
		}),
		membersCount: t.relationCount('members'),
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
		joined: t.boolean({
			select: {
				members: true,
			},
			resolve: (parent, _args, ctx) =>
				parent.members.some((member) => member.id === ctx.session?.user.id),
		}),
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

builder.queryField('communities', (t) =>
	t.prismaField({
		type: ['Community'],
		args: {
			filter: t.arg({
				type: CommunityWhere,
			}),
			take: t.arg({ type: 'Int' }),
			sort: t.arg({ type: 'String' }),
		},
		resolve: async (query, _parent, args, ctx) => {
			const communities = await ctx.prisma.community.findMany({
				...query,
				where: args.filter ?? undefined,
				take: args.take ?? undefined,
				orderBy: {
					...(args.sort === 'member'
						? { members: { _count: 'desc' } }
						: undefined),
				},
			});

			return communities;
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
			id: t.arg.string({ required: true }),
			description: t.arg.string(),
			topicId: t.arg.string(),
			name: t.arg.string(),
			image: t.arg.string(),
		},
		resolve: async (query, _parent, args, ctx) => {
			if (!ctx.session) {
				throw new Error('You have to be logged in.');
			}

			const { id, description, topicId, name, image } = args;

			const community = await ctx.prisma.community.update({
				...query,
				where: {
					id,
				},
				data: {
					description,
					topicId,
					name: name ?? undefined,
					image,
				},
			});

			if (!community) {
				throw new Error('Couldnt update community.');
			}

			return community;
		},
	})
);

builder.mutationField('changeMembership', (t) =>
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

			const community = await ctx.prisma.community.findUnique({
				where: {
					name,
				},
				include: {
					members: true,
				},
			});

			if (!community) {
				throw new Error('Couldnt find community');
			}

			const isMember = community.members.some(
				(member) => member.id === ctx.session!.user.id
			);

			const operation = isMember
				? {
						disconnect: {
							id: ctx.session.user.id,
						},
				  }
				: {
						connect: {
							id: ctx.session.user.id,
						},
				  };

			const updated = await ctx.prisma.community.update({
				...query,
				where: {
					name,
				},
				data: {
					members: operation,
				},
			});

			if (!updated) {
				throw new Error('Couldnt update community.');
			}

			return updated;
		},
	})
);
