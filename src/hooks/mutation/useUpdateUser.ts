import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { User } from '@prisma/client';

type UpdateUserVariables =
	| {
			name: User['name'];
	  }
	| { displayName: User['displayName'] }
	| { about: User['about'] };

type UpdateUserResponse = {
	updateUser: {
		name: User['name'];
		displayName: User['displayName'];
		about: User['about'];
	};
};

const UPDATE_USER_MUTATION = gql`
	mutation ($name: String, $displayName: String, $about: String) {
		updateUser(name: $name, displayName: $displayName, about: $about) {
			name
			displayName
			about
		}
	}
`;

export default function useUpdateUser(
	options: MutationHookOptions<UpdateUserResponse, UpdateUserVariables>
) {
	return useMutation(UPDATE_USER_MUTATION, options);
}
