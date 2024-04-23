import { QueryHookOptions, gql, useLazyQuery, useQuery } from '@apollo/client';

export type CommunityInfo = {
	id: string;
	name: string;
	image: string | null;
	membersCount: number;
	joined: boolean;
};

export type CommunitiesQueryResponse = {
	communities: CommunityInfo[];
};

type CommunitiesQueryVariables = {
	filter?: any;
	sort?: string;
	take?: number;
};

export const COMMUNITIES_QUERY = gql`
	query Communities($filter: CommunityFilter, $take: Int, $sort: String) {
		communities(filter: $filter, take: $take, sort: $sort) {
			id
			name
			image
			membersCount
			joined
		}
	}
`;

export default function useCommunities(
	options?: QueryHookOptions<
		CommunitiesQueryResponse,
		CommunitiesQueryVariables
	>
) {
	return useQuery<CommunitiesQueryResponse, CommunitiesQueryVariables>(
		COMMUNITIES_QUERY,
		options
	);
}

export function useLazyCommunities(
	options?: QueryHookOptions<
		CommunitiesQueryResponse,
		CommunitiesQueryVariables
	>
) {
	return useLazyQuery<CommunitiesQueryResponse, CommunitiesQueryVariables>(
		COMMUNITIES_QUERY,
		options
	);
}
