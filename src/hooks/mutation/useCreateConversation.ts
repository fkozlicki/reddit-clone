import { gql, useMutation } from '@apollo/client';
import { Conversation } from '@prisma/client';
import { PostAuthor } from '../query/usePost';

const CREATE_CONVERSATION_MUTATION = gql`
	mutation CreateConversation($userId: String!) {
		createConversation(userId: $userId) {
			id
			participants {
				id
				name
				image
			}
		}
	}
`;

type CreateConversationVariables = {
	userId: string;
};

type CreateConversationResponse = {
	createConversation: Conversation & {
		participants: PostAuthor[];
	};
};

export default function useCreateConversation() {
	return useMutation<CreateConversationResponse, CreateConversationVariables>(
		CREATE_CONVERSATION_MUTATION
	);
}
