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
				replies {
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
			}
		}
	}
`;

export default function usePost(
	options: QueryHookOptions<PostQueryResponse, PostQueryVariables>
) {
	return useQuery<PostQueryResponse, PostQueryVariables>(POST_QUERY, options);
}
