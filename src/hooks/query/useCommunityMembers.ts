import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { User } from '@prisma/client';

type CommunityQueryResponse = {
	community: {
		members: {
			id: User['id'];
		}[];
	};
};

type CommunityQueryVariables = {
	name: string;
};

export const COMMUNITY_MEMBERS_QUERY = gql`
	query ($name: String!) {
		community(name: $name) {
			members {
				id
			}
		}
	}
`;

export default function useCommunityMembers(
	options: QueryHookOptions<CommunityQueryResponse, CommunityQueryVariables>
) {
	return useQuery<CommunityQueryResponse, CommunityQueryVariables>(
		COMMUNITY_MEMBERS_QUERY,
		options
	);
}
