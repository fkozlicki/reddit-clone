import { gql, useMutation } from '@apollo/client';

const CREATE_MESSAGE_MUTATION = gql`
	mutation createMessage($receiverId: String!, $content: String!) {
		createMessage(receiverId: $receiverId, content: $content) {
			id
			content
			createdAt
		}
	}
`;

export default function useCreateMessage() {
	return useMutation(CREATE_MESSAGE_MUTATION);
}
