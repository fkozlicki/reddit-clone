import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { Comment, Post, User } from '@prisma/client';
import { VoteValue } from '../mutation/useVote';
import { PostPreview } from './usePosts';

export type PostAuthor = Pick<User, 'id' | 'name' | 'image'>;

export type PostComment = Pick<Comment, 'id' | 'content' | 'createdAt'> & {
	__typename: 'Comment';
	author: PostAuthor;
	replies?: PostComment[];
	karma: number;
	voteValue: VoteValue | null;
	postId: string;
};

type PostDetails = PostPreview & {
	comments: PostComment[];
};

export type PostQueryResponse = {
	post: PostDetails;
};

type PostQueryVariables = {
	id: Post['id'];
	commentsFilter?: any;
};

export const POST_QUERY = gql`
	fragment CommentFields on Comment {
		id
		content
		createdAt
		voteValue
		karma
		postId
		author {
			id
			name
			image
		}
	}
	query Post($id: String!, $commentsFilter: CommentFilter) {
		post(id: $id) {
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
			comments(filter: $commentsFilter, sort: new) {
				...CommentFields
				replies {
					...CommentFields
					replies {
						...CommentFields
						replies {
							...CommentFields
						}
					}
				}
			}
		}
	}
`;

export default function usePost(
	options: QueryHookOptions<PostQueryResponse, PostQueryVariables>
) {
	return useQuery<PostQueryResponse, PostQueryVariables>(POST_QUERY, options);
}
