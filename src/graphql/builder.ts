import SchemaBuilder from '@pothos/core';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { createContext } from './context';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import { prisma } from '../lib/prisma';
import { DateTimeResolver } from 'graphql-scalars';
import PrismaUtilsPlugin from '@pothos/plugin-prisma-utils';

export const builder = new SchemaBuilder<{
	PrismaTypes: PrismaTypes;
	Context: Awaited<ReturnType<typeof createContext>>;
	Scalars: {
		Date: {
			Input: Date;
			Output: Date;
		};
	};
}>({
	plugins: [PrismaPlugin, RelayPlugin, PrismaUtilsPlugin],
	relayOptions: {},
	prisma: {
		client: prisma,
	},
});

builder.queryType({});

builder.mutationType({});

builder.subscriptionType({});

builder.addScalarType('Date', DateTimeResolver, {});

export const NameFilter = builder.prismaFilter('String', {
	ops: ['contains', 'is', 'equals'],
});

export const UserFilter = builder.prismaWhere('User', {
	fields: {
		id: 'String',
		name: 'String',
	},
});

export const UserListFilter = builder.prismaListFilter(UserFilter, {
	ops: ['every', 'some', 'none'],
});

export const PostVoteFilter = builder.prismaWhere('Vote', {
	fields: {
		value: 'Int',
		user: UserFilter,
	},
});

export const PostVoteListFilter = builder.prismaListFilter(PostVoteFilter, {
	ops: ['every', 'some', 'none'],
});

export const SavedPostFilter = builder.prismaWhere('SavedPost', {
	fields: {
		user: UserFilter,
	},
});

export const SavedPostListFilter = builder.prismaListFilter(SavedPostFilter, {
	ops: ['some'],
});

export const CommunityWhere = builder.prismaWhere('Community', {
	fields: {
		name: NameFilter,
		topic: builder.prismaWhere('Topic', {
			fields: {
				slug: 'String',
			},
		}),
		members: UserListFilter,
	},
});

export const PostFilter = builder.prismaWhere('Post', {
	fields: {
		community: CommunityWhere,
		author: UserFilter,
		votes: PostVoteListFilter,
		saved: SavedPostListFilter,
	},
});

export const CommentFilter = builder.prismaWhere('Comment', {
	fields: {
		author: UserFilter,
		replyToId: 'String',
		id: 'String',
	},
});

export const Sort = builder.enumType('Sort', {
	values: ['hot', 'top', 'new'],
});
