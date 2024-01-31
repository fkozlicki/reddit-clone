import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { PostPreview } from '../query/usePosts';

const SAVE_POST_MUTATION = gql`
	mutation savePost($id: String!) {
		save(id: $id) {
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

type SavePostVariables = { id: string };

type SavePostResponse = {
	save: PostPreview;
};

export default function useSavePost(
	options: MutationHookOptions<SavePostResponse, SavePostVariables>
) {
	return useMutation<SavePostResponse, SavePostVariables>(
		SAVE_POST_MUTATION,
		options
	);
}
