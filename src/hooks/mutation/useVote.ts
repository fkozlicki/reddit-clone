import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { CommentVote, Vote } from '@prisma/client';

type PostVoteMutationVariables = {
	value: 1 | -1;
	postId: Vote['postId'];
};

type CommentVoteMutationVariables = {
	value: 1 | -1;
	commentId: CommentVote['commentId'];
};

type PostVoteMutationResponse = {
	makeVote: Vote;
};

type CommentVoteMutationResponse = {
	makeCommentVote: CommentVote;
};

type VoteMutationVariables =
	| PostVoteMutationVariables
	| CommentVoteMutationVariables;

type VoteMutationResponse =
	| PostVoteMutationResponse
	| CommentVoteMutationResponse;

export const POST_VOTE_MUTATION = gql`
	mutation ($value: Int!, $postId: String!) {
		makeVote(value: $value, postId: $postId) {
			id
			value
			userId
			postId
		}
	}
`;

export const COMMENT_VOTE_MUTATION = gql`
	mutation ($value: Int!, $commentId: String!) {
		makeCommentVote(value: $value, commentId: $commentId) {
			id
			value
			userId
			commentId
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
