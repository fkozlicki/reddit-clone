import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { Community, Topic } from '@prisma/client';

type ChangeDescriptionResponse = {
	updateCommunity: {
		name: Community['name'];
		description: Community['description'];
		topic: {
			name: Topic['name'];
		};
	};
};
type ChangeDescriptionVariables = {
	id: string;
} & (
	| { description: Community['description'] }
	| { topicId: Topic['id'] }
	| { image: Community['image'] }
	| { name: Community['name'] }
);

const UPDATE_COMMUNITY_MUTATION = gql`
	mutation (
		$id: String!
		$description: String
		$topicId: String
		$image: String
		$name: String
	) {
		updateCommunity(
			id: $id
			description: $description
			topicId: $topicId
			image: $image
			name: $name
		) {
			name
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
	return useMutation<ChangeDescriptionResponse, ChangeDescriptionVariables>(
		UPDATE_COMMUNITY_MUTATION,
		options
	);
}
