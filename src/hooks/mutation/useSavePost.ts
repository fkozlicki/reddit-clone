import { MutationHookOptions, gql, useMutation } from '@apollo/client';

const SAVE_POST_MUTATION = gql`
	mutation savePost($id: String!) {
		save(id: $id) {
			id
			title
			content
			createdAt
			comments {
				id
			}
			votes {
				userId
				value
			}
			author {
				name
				image
			}
			community {
				name
			}
			savedBy {
				id
			}
		}
	}
`;

type SavePostVariables = { id: string };

type SavePostResponse = {
	save: {
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
