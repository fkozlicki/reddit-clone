import { MutationHookOptions, gql, useMutation } from '@apollo/client';
import {
	POSTS_QUERY,
	PostPreview,
	PostsQueryResponse,
} from '../query/usePosts';
import { randomBytes } from 'crypto';
import { useSession } from 'next-auth/react';

const SAVE_POST_MUTATION = gql`
	mutation savePost($id: String!) {
		save(id: $id) {
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

type SavePostVariables = { id: string };

type SavePostResponse = {
	save: PostPreview;
};

export default function useSavePost(
	options: MutationHookOptions<SavePostResponse, SavePostVariables>
) {
	const { data: session } = useSession();

	return useMutation<SavePostResponse, SavePostVariables>(SAVE_POST_MUTATION, {
		...options,
		update: (cache, result) => {
			cache.updateQuery<PostsQueryResponse>(
				{
					query: POSTS_QUERY,
					variables: {
						first: 5,
						filter: {
							saved: { some: { user: { name: session?.user.name } } },
						},
						sort: 'new',
					},
				},
				(data) => {
					if (!data || !result.data) {
						return null;
					}

					const saved = result.data.save.saved;

					const post = result.data.save;

					return {
						...data,
						posts: {
							...data.posts,
							edges: saved
								? [
										{
											cursor: randomBytes(32).toString('base64'),
											node: post,
										},
										...data.posts.edges,
								  ]
								: data.posts.edges.filter((edge) => edge.node.id !== post.id),
						},
					};
				}
			);
		},
	});
}
