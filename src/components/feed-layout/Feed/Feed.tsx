'use client';

import Post from '@/components/shared/Post/Post';
import {
	POSTS_QUERY,
	PostsQueryResponse,
	PostsQueryVariables,
} from '@/hooks/query/usePosts';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSuspenseQuery } from '@apollo/client';
import { useEffect } from 'react';

interface FeedProps {
	sort?: any;
	filter?: any;
}

const Feed = ({ sort, filter }: FeedProps) => {
	const { data, fetchMore } = useSuspenseQuery<
		PostsQueryResponse,
		PostsQueryVariables
	>(POSTS_QUERY, {
		variables: {
			first: 5,
			sort,
			filter,
		},
	});
	const [ref, entry] = useIntersectionObserver<HTMLDivElement>();

	useEffect(() => {
		if (entry?.isIntersecting && data?.posts.pageInfo.hasNextPage) {
			fetchMore({
				variables: {
					after: data.posts.pageInfo.endCursor,
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					fetchMoreResult.posts.edges = [
						...prev.posts.edges,
						...fetchMoreResult.posts.edges,
					];
					return fetchMoreResult;
				},
			});
		}
	}, [entry, fetchMore, data]);

	return (
		<div className="flex flex-col gap-4">
			{data && (
				<>
					{data.posts.edges.length > 0 ? (
						<>
							{data.posts.edges.map(({ node: post }, index) => (
								<Post key={index} post={post} preview />
							))}
						</>
					) : (
						<div className="text-center mb-4 bg-primary p-3 border border-post rounded text-primary">
							No posts
						</div>
					)}
				</>
			)}
			<div ref={ref}></div>
		</div>
	);
};

export default Feed;
