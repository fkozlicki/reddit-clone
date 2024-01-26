import { QueryHookOptions, gql, useLazyQuery, useQuery } from '@apollo/client';

type CommunitiesQueryResponse = {
	communities: {
		id: string;
		name: string;
		membersCount: number;
	}[];
};

type CommunitiesQueryVariables = {
	filter?: any;
	sort?: string;
	take?: number;
};

const COMMUNITIES_QUERY = gql`
	query Communities($filter: CommunityFilter, $take: Int, $sort: String) {
		communities(filter: $filter, take: $take, sort: $sort) {
			id
			name
			membersCount
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
