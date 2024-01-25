import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { CommentWithPost } from './useComments';
import { PostInfo } from './usePosts';

export const OVERVIEW_QUERY = gql`
	query Overview($name: String!, $first: Int, $after: ID) {
		overview(name: $name, first: $first, after: $after) {
			pageInfo {
				endCursor
				hasNextPage
			}
			edges {
				cursor
				node {
					... on Post {
						id
						title
						content
						createdAt
						community {
							name
						}
						comments {
							id
						}
						votes {
							userId
							value
						}
						author {
							name
							image
						}
						savedBy {
							id
						}
					}
					... on Comment {
						id
						content
						createdAt
						author {
							name
						}
						post {
							title
							id
							community {
								name
							}
							author {
								name
							}
						}
					}
				}
			}
		}
	}
`;

export type OverviewQueryResponse = {
	overview: {
		pageInfo: {
			endCursor: string;
			hasNextPage: boolean;
		};
		edges: { cursor: string; node: CommentWithPost | PostInfo }[];
	};
};

type OverviewQueryVariables = {
	name: string;
	first?: number;
	after?: string;
};

export default function useOverview(
	options: QueryHookOptions<OverviewQueryResponse, OverviewQueryVariables>
) {
	return useQuery<OverviewQueryResponse, OverviewQueryVariables>(
		OVERVIEW_QUERY,
		options
	);
}
