import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { Community } from '@prisma/client';

type CreateCommunityVariables = {
	name: Community['name'];
};

type CreateCommunityResponse = {
	createCommunity: {
		name: Community['name'];
	};
};

export const CREATE_COMMUNITY_MUTATION = gql`
	mutation ($name: String!) {
		createCommunity(name: $name) {
			name
		}
	}
`;

export default function useCreateCommunity(
	options: MutationHookOptions<
		CreateCommunityResponse,
		CreateCommunityVariables
	>
) {
	return useMutation<CreateCommunityResponse, CreateCommunityVariables>(
		CREATE_COMMUNITY_MUTATION,
		options
	);
}
