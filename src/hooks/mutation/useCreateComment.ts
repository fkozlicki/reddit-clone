import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { Comment, User } from '@prisma/client';

type CreateCommentVariables = {
	postId: Comment['postId'];
	content: Comment['content'];
	replyToId: Comment['replyToId'];
};

type CreateCommentResponse = {
	createComment: {
		id: Comment['id'];
		content: Comment['content'];
		createdAt: Comment['createdAt'];
		author: {
			name: User['name'];
		};
	};
};

export const CREATE_COMMENT_MUTATION = gql`
	mutation ($postId: String!, $content: String!, $replyToId: String) {
		createComment(postId: $postId, content: $content, replyToId: $replyToId) {
			id
			content
			createdAt
			author {
				name
			}
		}
	}
`;

export default function useCreateComment(
	options: MutationHookOptions<CreateCommentResponse, CreateCommentVariables>
) {
	return useMutation<CreateCommentResponse, CreateCommentVariables>(
		CREATE_COMMENT_MUTATION,
		options
	);
}
