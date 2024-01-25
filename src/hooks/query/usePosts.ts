import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { Comment, Community, Post, User } from '@prisma/client';
import { PostVote } from './usePost';

export type PostInfo = Omit<Post, 'authorId' | 'communityId'> & {
	__typename: 'Post';
	comments: {
		id: Comment['id'];
	}[];
	votes: PostVote[];
	author: {
		name: User['name'];
		image: User['image'];
	};
	community: {
		name: Community['name'];
	};
	savedBy: { id: string }[];
};

export type PostsQueryResponse = {
	posts: {
		pageInfo: {
			endCursor: string;
			hasNextPage: boolean;
		};
		edges: {
			cursor: string;
			node: PostInfo;
		}[];
	};
};

type PostsQueryVariables = {
	first?: number;
	after?: string;
	sort?: any;
	filter?: any;
};

export type FeedType = 'new' | 'hot' | 'top';

export const POSTS_QUERY = gql`
	query Posts($first: Int, $after: ID, $filter: PostFilter, $sort: PostSort) {
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
					comments {
						id
					}
					votes {
						userId
						value
					}
					author {
						name
						image
					}
					community {
						name
					}
					savedBy {
						id
					}
				}
			}
		}
	}
`;

export default function usePosts(
	options: QueryHookOptions<PostsQueryResponse, PostsQueryVariables>
) {
	return useQuery<PostsQueryResponse, PostsQueryVariables>(
		POSTS_QUERY,
		options
	);
}
