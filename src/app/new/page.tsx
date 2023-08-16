import { gql } from '@apollo/client';
import HomeScreen from '@/components/HomeScreen/HomeScreen';

const NEW_POSTS_QUERY = gql`
	query newPosts($offset: Int, $limit: Int) {
		posts(offset: $offset, limit: $limit, sort: new) {
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

export default async function New() {
	return <HomeScreen query={NEW_POSTS_QUERY} highlighted="new" />;
}
