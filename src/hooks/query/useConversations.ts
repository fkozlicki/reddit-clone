import { gql, useQuery } from '@apollo/client';
import { Conversation } from '@prisma/client';
import { PostAuthor } from './usePost';
import { MessageItem } from './useMessages';

export const CONVERSATIONS_QUERY = gql`
	query Conversations {
		conversations {
			id
			participants {
				id
				name
				image
			}
			lastMessage {
				id
				content
				author {
					id
					name
					image
				}
			}
		}
	}
`;

type ConversationsQueryResponse = {
	conversations: (Conversation & {
		participants: PostAuthor[];
		lastMessage: MessageItem;
	})[];
};

export default function useConversations() {
	return useQuery<ConversationsQueryResponse>(CONVERSATIONS_QUERY);
}
