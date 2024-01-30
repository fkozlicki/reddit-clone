import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { Comment, Post, User } from '@prisma/client';
import { VoteValue } from '../mutation/useVote';
import { PostPreview } from './usePosts';

export type PostAuthor = Pick<User, 'id' | 'name' | 'image'>;

export type PostComment = Pick<Comment, 'id' | 'content' | 'createdAt'> & {
	author: PostAuthor;
	replies: PostComment[];
	karma: number;
	voteValue: VoteValue | null;
};

type PostDetails = PostPreview & {
	comments: PostComment[];
};

type PostQueryResponse = {
	post: PostDetails;
};

type PostQueryVariables = {
	id: Post['id'];
};

export const POST_QUERY = gql`
	fragment CommentFields on Comment {
		id
		content
		createdAt
		voteValue
		karma
		author {
			id
			name
			image
		}
	}
	query Post($id: String!) {
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
			comments(where: { replyToId: null }) {
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
