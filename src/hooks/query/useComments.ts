import { QueryHookOptions, gql, useQuery } from '@apollo/client';

const COMMENTS_QUERY = gql`
	query Comments($filter: CommentFilter) {
		comments(filter: $filter) {
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
`;

export type CommentWithPost = {
	__typename: 'Comment';
	id: string;
	content: string;
	createdAt: string;
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

type CommentsQueryResponse = {
	comments: CommentWithPost[];
};

type CommentsQueryVariables = {
	filter?: any;
};

export default function useComments(
	options: QueryHookOptions<CommentsQueryResponse, CommentsQueryVariables>
) {
	return useQuery<CommentsQueryResponse, CommentsQueryVariables>(
		COMMENTS_QUERY,
		options
	);
}
