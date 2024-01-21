import { MutationHookOptions, gql, useMutation } from '@apollo/client';

const SAVE_POST_MUTATION = gql`
	mutation savePost($id: String!) {
		save(id: $id) {
			id
		}
	}
`;

type SavePostVariables = { id: string };

type SavePostResponse = {
	savePost: {
		id: string;
	};
};

export default function useSavePost(
	options: MutationHookOptions<SavePostResponse, SavePostVariables>
) {
	return useMutation<SavePostResponse, SavePostVariables>(
		SAVE_POST_MUTATION,
		options
	);
}
