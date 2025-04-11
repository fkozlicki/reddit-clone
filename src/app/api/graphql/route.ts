import { createContext } from '@/graphql/context';
import { schema } from '@/graphql/schema';
import { createYoga } from 'graphql-yoga';

interface NextContext {
	params: Promise<Record<string, string>>;
}

const { handleRequest } = createYoga<NextContext>({
	schema,
	context: createContext,
	graphqlEndpoint: '/api/graphql',
	fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
