import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import { Comment, Community, Post, User } from '@prisma/client';
import { PostVote } from './usePost';

export type PostInfo = Omit<Post, 'authorId' | 'communityId'> & {
	comments: {
		id: Comment['id'];
	}[];
	votes: PostVote[];
	author: {
		name: User['name'];
	};
	community: {
		name: Community['name'];
	};
};

type PostsQueryResponse = {
	posts: PostInfo[];
};

type PostsQueryVariables = {
	offset: number;
	limit: number;
	sort?: any;
	filter?: any;
};

export type FeedType = 'new' | 'hot' | 'top';

export const POSTS_QUERY = gql`
	query Posts($offset: Int, $limit: Int, $filter: PostFilter, $sort: PostSort) {
		posts(offset: $offset, limit: $limit, filter: $filter, sort: $sort) {
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

export default function usePosts(
	options: QueryHookOptions<PostsQueryResponse, PostsQueryVariables>
) {
	return useQuery<PostsQueryResponse, PostsQueryVariables>(
		POSTS_QUERY,
		options
	);
}
