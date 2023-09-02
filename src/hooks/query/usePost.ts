import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { Comment, Community, Post, User, Vote } from '@prisma/client';

export type PostVote = Omit<Vote, 'id' | 'postId'>;

type PostAuthor = {
	name: User['name'];
};

export type CommentReply = {
	id: Comment['id'];
	content: Comment['content'];
	createdAt: Comment['createdAt'];
	author: PostAuthor;
	votes: PostVote[];
};

export type PostComment = CommentReply & {
	replies: CommentReply[];
};

type PostQueryResponse = {
	post: Omit<Post, 'authorId' | 'communityId'> & {
		comments: PostComment[];
		votes: PostVote[];
		author: PostAuthor;
		community: {
			name: Community['name'];
		};
	};
};

type PostQueryVariables = {
	id: Post['id'];
};

const POST_QUERY = gql`
	query ($id: String!) {
		post(id: $id) {
			id
			title
			createdAt
			content
			comments {
				id
				content
				createdAt
				author {
					name
				}
				votes {
					userId
					value
				}
				replies {
					author {
						name
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
			}
			community {
				name
			}
		}
	}
`;

export default function usePost(
	options: QueryHookOptions<PostQueryResponse, PostQueryVariables>
) {
	return useQuery(POST_QUERY, options);
}
