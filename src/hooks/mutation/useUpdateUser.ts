import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { User } from '@prisma/client';

export type UpdateUserVariables =
	| {
			name: User['name'];
	  }
	| { displayName: User['displayName'] }
	| { about: User['about'] }
	| { image: User['image'] };

type UpdateUserResponse = {
	updateUser: {
		name: User['name'];
		displayName: User['displayName'];
		about: User['about'];
		image: User['image'];
	};
};

const UPDATE_USER_MUTATION = gql`
	mutation (
		$name: String
		$displayName: String
		$about: String
		$image: String
	) {
		updateUser(
			name: $name
			displayName: $displayName
			about: $about
			image: $image
		) {
			name
			displayName
			about
			image
		}
	}
`;

export default function useUpdateUser(
	options: MutationHookOptions<UpdateUserResponse, UpdateUserVariables>
) {
	return useMutation<UpdateUserResponse, UpdateUserVariables>(
		UPDATE_USER_MUTATION,
		options
	);
}
