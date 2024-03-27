import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { Message } from '@prisma/client';
import { PostAuthor } from './usePost';

const MESSAGES_QUERY = gql`
	query Messages($conversationId: String!, $after: ID, $first: Int) {
		messages(conversationId: $conversationId, after: $after, first: $first) {
			pageInfo {
				endCursor
				hasNextPage
			}
			edges {
				cursor
				node {
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
		}
	}
`;

export type MessageItem = Pick<Message, 'id' | 'content' | 'createdAt'> & {
	author: PostAuthor;
};

type MessagesQueryResponse = {
	messages: {
		pageInfo: {
			endCursor: string;
			hasNextPage: boolean;
		};
		edges: {
			cursor: string;
			node: MessageItem;
		}[];
	};
};

type MessagesQueryVariables = {
	conversationId: string;
	first?: number;
	after?: string;
};

export default function useMessages(
	options?: QueryHookOptions<MessagesQueryResponse, MessagesQueryVariables>
) {
	return useQuery<MessagesQueryResponse, MessagesQueryVariables>(
		MESSAGES_QUERY,
		options
	);
}
