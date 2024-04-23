import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { Community } from '@prisma/client';
import {
	COMMUNITIES_QUERY,
	CommunitiesQueryResponse,
	CommunityInfo,
} from '../query/useCommunities';
import { useSession } from 'next-auth/react';

type CreateCommunityVariables = {
	name: Community['name'];
};

type CreateCommunityResponse = {
	createCommunity: CommunityInfo;
};

export const CREATE_COMMUNITY_MUTATION = gql`
	mutation ($name: String!) {
		createCommunity(name: $name) {
			id
			name
			image
			membersCount
			joined
		}
	}
`;

export default function useCreateCommunity(
	options: MutationHookOptions<
		CreateCommunityResponse,
		CreateCommunityVariables
	>
) {
	const { data: session } = useSession();

	return useMutation<CreateCommunityResponse, CreateCommunityVariables>(
		CREATE_COMMUNITY_MUTATION,
		{
			...options,
			update: (cache, result) => {
				if (!result.data) {
					return;
				}

				const newCommunity = result.data.createCommunity;

				cache.updateQuery<CommunitiesQueryResponse>(
					{
						query: COMMUNITIES_QUERY,
						variables: {
							filter: { members: { some: { name: session?.user.name } } },
						},
					},
					(data) => {
						if (!data) {
							return;
						}

						return {
							communities: [newCommunity, ...data.communities],
						};
					}
				);
			},
		}
	);
}
