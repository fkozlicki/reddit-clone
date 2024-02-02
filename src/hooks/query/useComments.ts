import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { Comment } from '@prisma/client';

export const COMMENTS_QUERY = gql`
	query Comments($first: Int, $after: ID, $filter: CommentFilter, $sort: Sort) {
		comments(first: $first, after: $after, filter: $filter, sort: $sort) {
			pageInfo {
				endCursor
				hasNextPage
			}
			edges {
				cursor
				node {
					id
					content
					createdAt
					author {
						id
						name
						image
					}
					post {
						id
						title
						community {
							name
						}
						author {
							id
							name
						}
					}
				}
			}
		}
	}
`;

export type CommentWithPost = Pick<Comment, 'id' | 'content' | 'createdAt'> & {
	__typename: 'Comment';
	author: {
		name: string;
	};
	post: {
		id: string;
		title: string;
		community: {
			name: string;
		};
		author: {
			name: string;
		};
	};
};

export type CommentsQueryResponse = {
	comments: {
		pageInfo: {
			endCursor: string;
			hasNextPage: boolean;
		};
		edges: {
			cursor: string;
			node: CommentWithPost;
		}[];
	};
};

type CommentsQueryVariables = {
	first?: number;
	after?: string;
	filter?: any;
	sort?: any;
};

export default function useComments(
	options: QueryHookOptions<CommentsQueryResponse, CommentsQueryVariables>
) {
	return useQuery<CommentsQueryResponse, CommentsQueryVariables>(
		COMMENTS_QUERY,
		options
	);
}
