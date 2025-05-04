'use client';

import ChatProvider from '@/contexts/ChatContext';
import ModalsProvider from '@/contexts/ModalsContext';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { getAppUrl } from '@/utils/getAppUrl';
import {
	ApolloClient,
	ApolloNextAppProvider,
	InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { SSELink } from '@/lib/sse-link';

function makeClient() {
	const link = new SSELink({
		url: `${getAppUrl()}/api/graphql`,
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: link,
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
