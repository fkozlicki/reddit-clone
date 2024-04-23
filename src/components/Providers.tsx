'use client';

import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apollo';
import ModalsProvider from '@/contexts/ModalsContext';
import ChatProvider from '@/contexts/ChatContext';
import { ThemeProvider } from 'next-themes';

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<ApolloProvider client={apolloClient}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<ModalsProvider>
						<ChatProvider>{children}</ChatProvider>
					</ModalsProvider>
				</ThemeProvider>
			</ApolloProvider>
		</SessionProvider>
	);
};

export default Providers;
