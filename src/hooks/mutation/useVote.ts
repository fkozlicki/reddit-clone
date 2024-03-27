import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { CommentVote, Vote } from '@prisma/client';
import {
	POSTS_QUERY,
	PostPreview,
	PostsQueryResponse,
} from '../query/usePosts';
import { useSession } from 'next-auth/react';
import { randomBytes } from 'crypto';
import toast from 'react-hot-toast';

export type VoteValue = 1 | -1;

type PostVoteMutationVariables = {
	value: VoteValue;
	postId: Vote['postId'];
};

type CommentVoteMutationVariables = {
	value: VoteValue;
	commentId: CommentVote['commentId'];
};

export type PostVoteMutationResponse = {
	votePost: PostPreview;
};

export type CommentVoteMutationResponse = {
	voteComment: {
		id: string;
		karma: number;
		voteValue: VoteValue | null;
	};
};

type VoteMutationVariables =
	| PostVoteMutationVariables
	| CommentVoteMutationVariables;

type VoteMutationResponse =
	| PostVoteMutationResponse
	| CommentVoteMutationResponse;

export const POST_VOTE_MUTATION = gql`
	mutation ($value: Int!, $postId: String!) {
		votePost(value: $value, postId: $postId) {
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
		}
	}
`;

export const COMMENT_VOTE_MUTATION = gql`
	mutation ($value: Int!, $commentId: String!) {
		voteComment(value: $value, commentId: $commentId) {
			id
			voteValue
			karma
		}
	}
`;

type VoteType = 'post' | 'comment';

export default function useVote(
	type: VoteType,
	options?: MutationHookOptions<VoteMutationResponse, VoteMutationVariables>
) {
	const { data: session } = useSession();

	return useMutation<VoteMutationResponse, VoteMutationVariables>(
		type === 'post' ? POST_VOTE_MUTATION : COMMENT_VOTE_MUTATION,
		{
			...options,
			onError() {
				toast.error('Vote failed');
			},
			update: (cache, result, options) => {
				function updatePosts(value: number) {
					cache.updateQuery<PostsQueryResponse>(
						{
							query: POSTS_QUERY,
							variables: {
								first: 5,
								filter: {
									votes: {
										some: {
											user: { name: session?.user.name },
											value,
										},
									},
								},
							},
						},
						(data) => {
							if (!data || !result.data) {
								return null;
							}

							const newPost = (result.data as PostVoteMutationResponse)
								.votePost;

							const added = newPost.voteValue === value;

							return {
								...data,
								posts: {
									...data.posts,
									edges: added
										? [
												{
													cursor: randomBytes(32).toString('base64'),
													node: newPost,
												},
												...data.posts.edges,
										  ]
										: data.posts.edges.filter(
												(edge) => edge.node.id !== newPost.id
										  ),
								},
							};
						}
					);
				}

				updatePosts(1);
				updatePosts(-1);
			},
		}
	);
}
