import { createYoga } from 'graphql-yoga';
import { NextApiRequest, NextApiResponse } from 'next';
import { schema } from '../../../graphql/schema';
import { createContext } from '@/graphql/context';

const { handleRequest } = createYoga<{
	req: NextApiRequest;
	res: NextApiResponse;
}>({
	schema,
	context: createContext,
	graphqlEndpoint: '/api/graphql',
	fetchAPI: {
		Request: Request,
		Response: Response,
	},
});

export { handleRequest as GET, handleRequest as POST };
