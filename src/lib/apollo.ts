import { getAppUrl } from '@/utils/getAppUrl';
import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { HttpLink } from '@apollo/client/core';
import { cookies } from 'next/headers';

export const { getClient, query, PreloadQuery } = registerApolloClient(
	async () => {
		const cookie = (await cookies())
			.getAll()
			.map(({ name, value }) => `${name}=${value}`)
			.join(';');

		return new ApolloClient({
			cache: new InMemoryCache(),
			link: new HttpLink({
				uri: `${getAppUrl()}/api/graphql`,
				headers: {
					cookie,
				},
			}),
		});
	}
);
