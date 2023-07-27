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

builder.queryType({
	fields: (t) => ({
		ok: t.boolean({
			resolve: () => true,
		}),
	}),
});

builder.mutationType({});

builder.addScalarType('Date', DateTimeResolver, {});
