import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { CommentWithPost } from './useComments';
import { PostPreview } from './usePosts';

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
						commentsCount
						karma
						voteValue
						saved
						author {
							id
							name
							image
						}
						community {
							name
						}
					}
					... on Comment {
						id
						content
						createdAt
						author {
							id
							name
							image
						}
						post {
							title
							id
							community {
								name
							}
							author {
								id
								name
								image
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
		edges: { cursor: string; node: CommentWithPost | PostPreview }[];
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
