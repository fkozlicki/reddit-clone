import { gql, useQuery } from '@apollo/client';
import { Topic } from '@prisma/client';

type TopicsQueryResponse = {
	topics: Topic[];
};

export const TOPICS_QUERY = gql`
	query {
		topics {
			id
			name
		}
	}
`;

export default function useTopics() {
	return useQuery<TopicsQueryResponse>(TOPICS_QUERY);
}
