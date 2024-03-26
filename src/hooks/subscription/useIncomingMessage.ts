import { gql, useSubscription } from '@apollo/client';

export const INCOMING_MESSAGE_SUBSCRIPTION = gql`
	subscription IncomingMessage {
		message {
			id
			content
			createdAt
		}
	}
`;

export default function useIncomingMessage() {
	return useSubscription(INCOMING_MESSAGE_SUBSCRIPTION);
}
