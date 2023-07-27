'use client';

import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apollo';

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<ApolloProvider client={apolloClient}>{children}</ApolloProvider>
		</SessionProvider>
	);
};

export default Providers;
