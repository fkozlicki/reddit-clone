import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { CommentVote, Vote } from '@prisma/client';
import { PostPreview } from '../query/usePosts';

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
	options: MutationHookOptions<VoteMutationResponse, VoteMutationVariables>
) {
	return useMutation<VoteMutationResponse, VoteMutationVariables>(
		type === 'post' ? POST_VOTE_MUTATION : COMMENT_VOTE_MUTATION,
		options
	);
}
