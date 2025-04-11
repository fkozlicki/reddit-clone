import { gql, useSuspenseQuery } from '@apollo/client';
import { Topic } from '@prisma/client';

type TopicsQueryResponse = {
	topics: Topic[];
};

export const TOPICS_QUERY = gql`
	query {
		topics {
			id
			name
			slug
		}
	}
`;

export default function useTopics() {
	return useSuspenseQuery<TopicsQueryResponse>(TOPICS_QUERY);
}
