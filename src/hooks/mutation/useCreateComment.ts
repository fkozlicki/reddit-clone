import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { Comment } from '@prisma/client';
import { POST_QUERY, PostComment, PostQueryResponse } from '../query/usePost';
import toast from 'react-hot-toast';
import { COMMENTS_QUERY, CommentsQueryResponse } from '../query/useComments';
import { useSession } from 'next-auth/react';
import { OVERVIEW_QUERY, OverviewQueryResponse } from '../query/useOverview';
import { randomBytes } from 'crypto';

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
	const { data: session } = useSession();

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

				const postData = cache.readQuery<PostQueryResponse>({
					query: POST_QUERY,
					variables: {
						id: variables.postId,
						commentsFilter: { replyToId: null },
					},
				});

				if (postData) {
					cache.updateQuery<OverviewQueryResponse>(
						{
							query: OVERVIEW_QUERY,
							variables: {
								name: session!.user.name,
								first: 10,
							},
						},
						(data) => {
							if (!data) {
								return;
							}

							return {
								overview: {
									...data.overview,
									edges: [
										{
											cursor: randomBytes(32).toString('hex'),
											node: {
												...newComment,
												post: postData.post,
											},
										},
										...data.overview.edges,
									],
								},
							};
						}
					);

					cache.updateQuery<CommentsQueryResponse>(
						{
							query: COMMENTS_QUERY,
							variables: {
								filter: { author: { name: session!.user.name } },
								sort: 'new',
							},
						},
						(data) => {
							if (!data) {
								return;
							}

							return {
								comments: {
									...data.comments,
									edges: [
										{
											cursor: randomBytes(32).toString('hex'),
											node: { ...newComment, post: postData.post },
										},
										...data.comments.edges,
									],
								},
							};
						}
					);
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
										replies: [reply, ...(comment.replies ?? [])],
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
