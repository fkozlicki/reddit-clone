import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { Community, Topic, User } from '@prisma/client';

export type CommunityData = Community & {
	moderators: { id: string }[];
	members: { id: string; image: User['image']; name: User['name'] }[];
	topic: Topic | null;
};

type CommunityQueryResponse = {
	community: CommunityData;
};

type CommunityQueryVariables = {
	name: string;
};

export const COMMUNITY_QUERY = gql`
	query Community($name: String!) {
		community(name: $name) {
			id
			name
			description
			createdAt
			image
			members {
				id
				image
				name
			}
			moderators {
				id
			}
			topic {
				id
				name
			}
		}
	}
`;

export default function useCommunity(
	options: QueryHookOptions<CommunityQueryResponse, CommunityQueryVariables>
) {
	return useQuery<CommunityQueryResponse, CommunityQueryVariables>(
		COMMUNITY_QUERY,
		options
	);
}
