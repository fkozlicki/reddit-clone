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

builder.addScalarType('Date', DateTimeResolver, {});

export const UserFilter = builder.prismaWhere('User', {
	fields: {
		id: 'String',
		name: 'String',
	},
});

export const UserListFilter = builder.prismaListFilter(UserFilter, {
	ops: ['every', 'some', 'none'],
});
