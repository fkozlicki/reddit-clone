import { gql } from '@apollo/client';
import HomeScreen from '@/components/HomeScreen/HomeScreen';

const POSTS_QUERY = gql`
	query bestPosts($offset: Int, $limit: Int) {
		posts(offset: $offset, limit: $limit) {
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

export default function Home() {
	return <HomeScreen feedType="best" highlighted="best" />;
}
