import { gql } from '@apollo/client';
import HomeScreen from '@/components/HomeScreen/HomeScreen';

const HOT_POSTS_QUERY = gql`
	query hotPosts($offset: Int, $limit: Int) {
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

export default function Hot() {
	return <HomeScreen query={HOT_POSTS_QUERY} highlighted="hot" />;
}
