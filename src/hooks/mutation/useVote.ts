import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { CommentVote, Vote } from '@prisma/client';
import { PostInfo } from '../query/usePosts';

type PostVoteMutationVariables = {
	value: 1 | -1;
	postId: Vote['postId'];
};

type CommentVoteMutationVariables = {
	value: 1 | -1;
	commentId: CommentVote['commentId'];
};

export type PostVoteMutationResponse = {
	makeVote: PostInfo;
};

export type CommentVoteMutationResponse = {
	makeCommentVote: CommentVote[];
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
			votes {
				userId
				value
			}
		}
	}
`;

export const COMMENT_VOTE_MUTATION = gql`
	mutation ($value: Int!, $commentId: String!) {
		voteComment(value: $value, commentId: $commentId) {
			id
			votes {
				userId
				value
			}
		}
	}
`;

type VoteType = 'post' | 'comment';

export default function useVote(
	type: VoteType,
	options: MutationHookOptions<VoteMutationResponse, VoteMutationVariables>
) {
	return useMutation<VoteMutationResponse, VoteMutationVariables>(
		type === 'post' ? POST_VOTE_MUTATION : COMMENT_VOTE_MUTATION,
		options
	);
}
