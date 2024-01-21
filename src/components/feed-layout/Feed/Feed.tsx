'use client';

import Post from '@/components/shared/Post/Post';
import PostSkeleton from '@/components/shared/PostSkeleton/PostSkeleton';
import usePosts from '@/hooks/query/usePosts';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface FeedProps {
	sort?: any;
	filter?: any;
}

const Feed = ({ sort, filter }: FeedProps) => {
	const { data, fetchMore, loading } = usePosts({
		notifyOnNetworkStatusChange: true,
		onError() {
			toast.error("Couldn't load posts");
		},
		variables: {
			first: 5,
			sort,
			filter,
		},
	});
	const [ref, entry] = useIntersectionObserver<HTMLDivElement>();

	useEffect(() => {
		if (entry?.isIntersecting && !loading && data?.posts.pageInfo.hasNextPage) {
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
	}, [entry, loading, fetchMore, data]);

	return (
		<div className="flex flex-col gap-6">
			{data &&
				data.posts.edges.map(({ node: post }) => (
					<Post key={post.id} post={post} refetch="Posts" preview />
				))}
			<div ref={ref}>
				{loading && (
					<div className="flex flex-col gap-6">
						{Array.from({ length: 3 }).map((_, index) => (
							<PostSkeleton key={index} />
						))}
					</div>
				)}
				{data && data.posts.edges.length === 0 && (
					<div className="text-center mb-4 bg-primary p-3 border border-post rounded">
						No posts
					</div>
				)}
				{data &&
					data.posts.edges.length > 0 &&
					!data.posts.pageInfo.hasNextPage && (
						<div className="text-center mb-4 bg-primary p-3 border border-post rounded text-primary">
							No more posts
						</div>
					)}
			</div>
		</div>
	);
};

export default Feed;
