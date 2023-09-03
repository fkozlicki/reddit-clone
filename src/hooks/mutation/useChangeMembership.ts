import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { User } from '@prisma/client';

type CommunityMutationVariables = {
	name: string;
};

type CommunityMutationResponse = {
	members: {
		id: User['id'];
	}[];
};

const CHANGE_MEMBERSHIP_MUTATION = gql`
	mutation ($name: String!) {
		changeMembership(name: $name) {
			members {
				id
			}
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
