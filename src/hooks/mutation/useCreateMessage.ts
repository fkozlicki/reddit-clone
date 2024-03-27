import { gql, useMutation } from '@apollo/client';
import { Message } from '@prisma/client';

const CREATE_MESSAGE_MUTATION = gql`
	mutation createMessage($conversationId: String!, $content: String!) {
		createMessage(conversationId: $conversationId, content: $content) {
			id
			content
			createdAt
			author {
				id
				name
				image
			}
		}
	}
`;

type CreateMessageVariables = {
	conversationId: string;
	content: string;
};

type CreateMessageResponse = {
	createMessage: Pick<Message, 'id' | 'content' | 'createdAt'>;
};

export default function useCreateMessage() {
	return useMutation<CreateMessageResponse, CreateMessageVariables>(
		CREATE_MESSAGE_MUTATION
	);
}
