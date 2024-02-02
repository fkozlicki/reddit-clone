import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import { Post } from '@prisma/client';
import { randomBytes } from 'crypto';
import { OVERVIEW_QUERY, OverviewQueryResponse } from '../query/useOverview';
import {
	POSTS_QUERY,
	PostPreview,
	PostsQueryResponse,
	PostsQueryVariables,
} from '../query/usePosts';

type CreatePostVariables = {
	title: Post['title'];
	content: Post['content'];
	communityId: Post['communityId'];
};

type CreatePostResponse = {
	createPost: PostPreview;
};

const CREATE_POST_MUTATION = gql`
	mutation ($title: String!, $content: String!, $communityId: String!) {
		createPost(title: $title, content: $content, communityId: $communityId) {
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
`;

export default function useCreatePost(
	options: MutationHookOptions<CreatePostResponse, CreatePostVariables>
) {
	return useMutation<CreatePostResponse, CreatePostVariables>(
		CREATE_POST_MUTATION,
		{
			...options,
			update: (cache, result) => {
				if (!result.data) {
					return;
				}

				const newPost = result.data.createPost;

				const updateFeed = (variables: PostsQueryVariables) => {
					cache.updateQuery<PostsQueryResponse>(
						{ query: POSTS_QUERY, variables },
						(data) => {
							if (!data) {
								return;
							}

							return {
								posts: {
									...data.posts,
									edges: [
										{
											cursor: randomBytes(32).toString('hex'),
											node: newPost,
										},
										...data.posts.edges,
									],
								},
							};
						}
					);
				};

				const feedsVariables = [
					{ first: 5, sort: 'hot' },
					{ first: 5, sort: 'new' },
					{ first: 5, sort: 'top' },
					{
						first: 5,
						sort: 'hot',
						filter: { community: { name: { equals: newPost.community.name } } },
					},
					{
						first: 5,
						sort: 'new',
						filter: { community: { name: { equals: newPost.community.name } } },
					},
					{
						first: 5,
						sort: 'top',
						filter: { community: { name: { equals: newPost.community.name } } },
					},
					{
						first: 5,
						sort: 'new',
						filter: { author: { name: newPost.author.name } },
					},
				];

				feedsVariables.forEach((variables) => {
					updateFeed(variables);
				});

				cache.updateQuery<OverviewQueryResponse>(
					{
						query: OVERVIEW_QUERY,
						variables: { name: newPost.author.name, first: 10 },
					},
					(data) => {
						if (!data) {
							return;
						}

						return {
							overview: {
								...data.overview,
								edges: [
									{ cursor: randomBytes(32).toString('hex'), node: newPost },
									...data.overview.edges,
								],
							},
						};
					}
				);
			},
		}
	);
}
