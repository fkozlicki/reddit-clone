'use client';

import ChatProvider from '@/contexts/ChatContext';
import ModalsProvider from '@/contexts/ModalsContext';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { ApolloWrapper } from './ApolloWrapper';

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<ApolloWrapper>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<ModalsProvider>
						<ChatProvider>{children}</ChatProvider>
					</ModalsProvider>
				</ThemeProvider>
			</ApolloWrapper>
		</SessionProvider>
	);
};

export default Providers;
