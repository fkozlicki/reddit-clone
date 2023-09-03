import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { Community, Post } from '@prisma/client';

type CreatePostVariables = {
	title: Post['title'];
	content: Post['content'];
	communityId: Post['communityId'];
};

type CreatePostResponse = {
	createPost: {
		id: Post['id'];
		community: {
			name: Community['name'];
		};
	};
};

const CREATE_POST_MUTATION = gql`
	mutation ($title: String!, $content: String!, $communityId: String!) {
		createPost(title: $title, content: $content, communityId: $communityId) {
			id
			community {
				name
			}
		}
	}
`;

export default function useCreatePost(
	options: MutationHookOptions<CreatePostResponse, CreatePostVariables>
) {
	return useMutation<CreatePostResponse, CreatePostVariables>(
		CREATE_POST_MUTATION,
		options
	);
}
