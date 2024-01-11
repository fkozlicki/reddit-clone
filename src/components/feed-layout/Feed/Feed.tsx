'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import React, { useEffect, useState } from 'react';
import usePosts, { FeedType } from '@/hooks/query/usePosts';
import Post from '@/components/shared/Post/Post';
import PostSkeleton from '@/components/shared/PostSkeleton/PostSkeleton';
import toast from 'react-hot-toast';

interface FeedProps {
	type: FeedType;
	communityName?: string;
	topicName?: string;
	authorName?: string;
}

const Feed = ({ type, communityName, topicName, authorName }: FeedProps) => {
	const { data, fetchMore, loading } = usePosts({
		notifyOnNetworkStatusChange: true,
		onError() {
			toast.error("Couldn't load posts");
		},
		variables: {
			first: 2,
			sort: type,
			filter: communityName
				? { community: { name: communityName } }
				: topicName
				? { community: { topic: { name: topicName } } }
				: authorName
				? { author: { name: authorName } }
				: undefined,
		},
	});
	const [ref, entry] = useIntersectionObserver<HTMLDivElement>();

	useEffect(() => {
		if (
			entry &&
			entry.isIntersecting &&
			!loading &&
			data?.posts.pageInfo.hasNextPage
		) {
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
					<Post key={post.id} post={post} refetch="Posts" />
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
