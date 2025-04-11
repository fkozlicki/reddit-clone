'use client';

import ChatProvider from '@/contexts/ChatContext';
import ModalsProvider from '@/contexts/ModalsContext';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { getAppUrl } from '@/utils/getAppUrl';
import { HttpLink } from '@apollo/client';
import {
	ApolloClient,
	ApolloNextAppProvider,
	InMemoryCache,
} from '@apollo/client-integration-nextjs';

function makeClient() {
	const httpLink = new HttpLink({
		uri: `${getAppUrl()}/api/graphql`,
		fetchOptions: {},
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: httpLink,
	});
}

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<ApolloNextAppProvider makeClient={makeClient}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<ModalsProvider>
						<ChatProvider>{children}</ChatProvider>
					</ModalsProvider>
				</ThemeProvider>
			</ApolloNextAppProvider>
		</SessionProvider>
	);
};

export default Providers;
