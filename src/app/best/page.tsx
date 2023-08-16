import { gql } from '@apollo/client';
import HomeScreen from '@/components/HomeScreen/HomeScreen';

const BEST_POSTS_QUERY = gql`
	query bestPosts($offset: Int, $limit: Int) {
		posts(offset: $offset, limit: $limit, sort: hot) {
			id
			title
			content
			createdAt
			comments {
				id
			}
			votes {
				userId
				value
			}
			author {
				name
			}
			community {
				name
			}
		}
	}
`;

export default function Best() {
	return <HomeScreen query={BEST_POSTS_QUERY} highlighted="best" />;
}
