import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { Comment } from '@prisma/client';
import { POST_QUERY, PostComment, PostQueryResponse } from '../query/usePost';
import toast from 'react-hot-toast';

type CreateCommentVariables = {
	postId: Comment['postId'];
	content: Comment['content'];
	replyToId: Comment['replyToId'];
};

type CreateCommentResponse = {
	createComment: PostComment;
};

export const CREATE_COMMENT_MUTATION = gql`
	mutation createComment(
		$postId: String!
		$content: String!
		$replyToId: String
	) {
		createComment(postId: $postId, content: $content, replyToId: $replyToId) {
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
			replies {
				id
			}
		}
	}
`;

export default function useCreateComment(
	options: MutationHookOptions<CreateCommentResponse, CreateCommentVariables>
) {
	return useMutation<CreateCommentResponse, CreateCommentVariables>(
		CREATE_COMMENT_MUTATION,
		{
			...options,
			onError() {
				toast.error("Couldn't create comment");
			},
			update: (cache, result, { variables }) => {
				const newComment = result.data?.createComment;

				if (!newComment || !variables) {
					return;
				}

				cache.updateQuery<PostQueryResponse>(
					{
						query: POST_QUERY,
						variables: {
							id: variables.postId,
							commentsFilter: { replyToId: null },
						},
					},
					(data) => {
						if (!data) {
							return;
						}

						function updateComments(
							comments: PostComment[],
							targetId: string,
							reply: PostComment
						): PostComment[] {
							return comments.map((comment) => {
								if (comment.id === targetId) {
									return {
										...comment,
										replies: [reply, ...comment.replies],
									};
								}

								if (comment.replies && comment.replies.length > 0) {
									return {
										...comment,
										replies: updateComments(comment.replies, targetId, reply),
									};
								}

								return comment;
							});
						}

						const comments = variables.replyToId
							? updateComments(
									data.post.comments,
									variables.replyToId,
									newComment
							  )
							: [newComment, ...data.post.comments];

						return {
							post: {
								...data.post,
								comments,
							},
						};
					}
				);
			},
		}
	);
}
