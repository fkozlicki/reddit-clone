'use client';
// ^ this file needs the "use client" pragma

import { HttpLink } from '@apollo/client';
import {
	ApolloNextAppProvider,
	ApolloClient,
	InMemoryCache,
} from '@apollo/client-integration-nextjs';

// have a function to create a client for you
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

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
}
