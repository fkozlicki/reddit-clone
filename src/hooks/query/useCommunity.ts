import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { Community, Topic } from '@prisma/client';
import { PostAuthor } from './usePost';

export type CommunityData = Omit<Community, 'topicId'> & {
	moderators: PostAuthor[];
	membersCount: number;
	topic: Topic | null;
	joined: boolean;
};

type CommunityQueryResponse = {
	community: CommunityData;
};

type CommunityQueryVariables = {
	name: string;
};

export const COMMUNITY_QUERY = gql`
	query Community($name: String!) {
		community(name: $name) {
			id
			name
			description
			createdAt
			image
			membersCount
			joined
			moderators {
				id
				name
				image
			}
			topic {
				id
				name
			}
		}
	}
`;

export default function useCommunity(
	options: QueryHookOptions<CommunityQueryResponse, CommunityQueryVariables>
) {
	return useQuery<CommunityQueryResponse, CommunityQueryVariables>(
		COMMUNITY_QUERY,
		options
	);
}
