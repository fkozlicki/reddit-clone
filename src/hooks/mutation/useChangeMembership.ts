import { MutationHookOptions, gql, useMutation } from '@apollo/client';

type CommunityMutationVariables = {
	name: string;
};

type CommunityMutationResponse = {
	changeMembership: {
		id: string;
		membersCount: number;
		joined: boolean;
	};
};

const CHANGE_MEMBERSHIP_MUTATION = gql`
	mutation ($name: String!) {
		changeMembership(name: $name) {
			id
			membersCount
			joined
		}
	}
`;

export default function useChangeMembership(
	options: MutationHookOptions<
		CommunityMutationResponse,
		CommunityMutationVariables
	>
) {
	return useMutation<CommunityMutationResponse, CommunityMutationVariables>(
		CHANGE_MEMBERSHIP_MUTATION,
		options
	);
}
