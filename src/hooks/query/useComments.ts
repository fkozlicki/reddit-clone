import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { Comment } from '@prisma/client';

export const COMMENTS_QUERY = gql`
	query Comments($filter: CommentFilter, $sort: Sort) {
		comments(filter: $filter, sort: $sort) {
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
	comments: CommentWithPost[];
};

type CommentsQueryVariables = {
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
