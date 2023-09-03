import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { Community, Topic } from '@prisma/client';

type ChangeDescriptionResponse = {
	updateCommunity: {
		description: Community['description'];
		topic: {
			name: Topic['name'];
		};
	};
};
type ChangeDescriptionVariables = {
	name: string;
} & ({ description: Community['description'] } | { topicId: Topic['id'] });

const UPDATE_COMMUNITY_MUTATION = gql`
	mutation ($name: String!, $description: String, $topicId: String) {
		updateCommunity(name: $name, description: $description, topicId: $topicId) {
			description
			topic {
				name
			}
		}
	}
`;

export default function useUpdateCommunity(
	options: MutationHookOptions<
		ChangeDescriptionResponse,
		ChangeDescriptionVariables
	>
) {
	return useMutation(UPDATE_COMMUNITY_MUTATION, options);
}
