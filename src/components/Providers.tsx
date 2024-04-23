'use client';

import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apollo';
import ThemeProvider from '@/contexts/ThemeContext';
import ModalsProvider from '@/contexts/ModalsContext';
import ChatProvider from '@/contexts/ChatContext';

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<ApolloProvider client={apolloClient}>
				<ThemeProvider>
					<ModalsProvider>
						<ChatProvider>{children}</ChatProvider>
					</ModalsProvider>
				</ThemeProvider>
			</ApolloProvider>
		</SessionProvider>
	);
};

export default Providers;
