'use client';

import { HttpLink } from '@apollo/client';
import {
	ApolloNextAppProvider,
	ApolloClient,
	InMemoryCache,
} from '@apollo/client-integration-nextjs';

function makeClient() {
	const httpLink = new HttpLink({
		uri: 'http://localhost:3000/api/graphql',
		fetchOptions: {},
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: httpLink,
	});
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
}
