import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { Comment, Community, Post, User, Vote } from '@prisma/client';

export type PostVote = Omit<Vote, 'id' | 'postId'>;

export type PostAuthor = {
	id: User['id'];
	name: User['name'];
	image: User['image'];
};

export type PostComment = {
	id: Comment['id'];
	content: Comment['content'];
	createdAt: Comment['createdAt'];
	author: PostAuthor;
	votes: PostVote[];
	replies: PostComment[];
};

type PostQueryResponse = {
	post: Omit<Post, 'authorId' | 'communityId'> & {
		__typename: 'Post';
		comments: PostComment[];
		votes: PostVote[];
		author: PostAuthor;
		community: {
			name: Community['name'];
		};
		savedBy: { id: string }[];
	};
};

type PostQueryVariables = {
	id: Post['id'];
};

export const POST_QUERY = gql`
	query Post($id: String!) {
		post(id: $id) {
			id
			title
			createdAt
			content
			comments(where: { replyToId: null }) {
				id
				content
				createdAt
				author {
					name
					image
				}
				votes {
					userId
					value
				}
				replies {
					author {
						name
						image
					}
					content
					createdAt
					id
					votes {
						userId
						value
					}
				}
			}
			votes {
				userId
				value
			}
			author {
				name
				image
			}
			community {
				name
			}
			savedBy {
				id
			}
		}
	}
`;

export default function usePost(
	options: QueryHookOptions<PostQueryResponse, PostQueryVariables>
) {
	return useQuery<PostQueryResponse, PostQueryVariables>(POST_QUERY, options);
}
