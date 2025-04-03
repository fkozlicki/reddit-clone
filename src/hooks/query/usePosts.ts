import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { Community, Post } from '@prisma/client';
import { PostAuthor } from './usePost';
import { VoteValue } from '../mutation/useVote';

export const POSTS_QUERY = gql`
	query Posts($first: Int, $after: ID, $filter: PostFilter, $sort: Sort) {
		posts(first: $first, after: $after, filter: $filter, sort: $sort) {
			pageInfo {
				endCursor
				hasNextPage
			}
			edges {
				cursor
				node {
					id
					title
					content
					createdAt
					commentsCount
					karma
					voteValue
					saved
					author {
						id
						name
						image
					}
					community {
						name
					}
				}
			}
		}
	}
`;

export type PostPreview = Omit<Post, 'authorId' | 'communityId'> & {
	__typename: 'Post';
	author: PostAuthor;
	community: {
		name: Community['name'];
	};
	voteValue: VoteValue | null;
	saved: boolean;
	karma: number;
	commentsCount: number;
};

export type PostsQueryResponse = {
	posts: {
		pageInfo: {
			endCursor: string;
			hasNextPage: boolean;
		};
		edges: {
			cursor: string;
			node: PostPreview;
		}[];
	};
};

export type PostsQueryVariables = {
	first?: number;
	after?: string;
	sort?: any;
	filter?: any;
};

export type FeedType = 'new' | 'hot' | 'top';

export default function usePosts(
	options: QueryHookOptions<PostsQueryResponse, PostsQueryVariables>
) {
	return useQuery<PostsQueryResponse, PostsQueryVariables>(
		POSTS_QUERY,
		options
	);
}
