import {
	QueryFunctionOptions,
	QueryHookOptions,
	gql,
	useQuery,
} from '@apollo/client';
import { Community, Topic } from '@prisma/client';

type CommunityQueryResponse = {
	community: Community & {
		moderators: { id: string }[];
		members: { id: string }[];
		topic: Topic | null;
	};
};

type CommunityQueryVariables = {
	name: string;
};

export const CommunityQuery = gql`
	query ($name: String!) {
		community(name: $name) {
			name
			description
			createdAt
			members {
				id
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
		CommunityQuery,
		options
	);
}
