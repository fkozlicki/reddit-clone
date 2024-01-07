'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import React, { useEffect, useState } from 'react';
import usePosts, { FeedType } from '@/hooks/query/usePosts';
import Post from '@/components/shared/Post/Post';
import PostSkeleton from '@/components/shared/PostSkeleton/PostSkeleton';

interface FeedProps {
	type: FeedType;
	communityName?: string;
	topicName?: string;
	authorName?: string;
}

const Feed = ({ type, communityName, topicName, authorName }: FeedProps) => {
	const [hasMoreData, setHasMoreData] = useState<boolean>(true);
	const { data, fetchMore, loading } = usePosts({
		notifyOnNetworkStatusChange: true,
		onError(error) {
			console.error(error);
		},
		variables: {
			offset: 0,
			limit: 10,
			sort:
				type === 'hot' || type === 'best'
					? 'hot'
					: type === 'new'
					? 'new'
					: type === 'top'
					? 'top'
					: undefined,
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
		if (entry && entry.isIntersecting && !loading && data && hasMoreData) {
			fetchMore({
				variables: {
					offset: data.posts.length,
					limit: 10,
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					if (!fetchMoreResult) return prev;
					if (fetchMoreResult.posts.length === 0) {
						setHasMoreData(false);
					}
					return {
						posts: [...prev.posts, ...fetchMoreResult.posts],
					};
				},
			});
		}
	}, [entry, loading, fetchMore, data, hasMoreData]);

	return (
		<div className="flex flex-col gap-6">
			{data &&
				data.posts.map(
					({
						id,
						author,
						content,
						title,
						createdAt,
						votes,
						comments,
						community,
					}) => (
						<Post
							key={id}
							id={id}
							authorName={author.name}
							content={content}
							title={title}
							createdAt={createdAt}
							votes={votes}
							commentsCount={comments.length}
							communityName={community.name}
						/>
					)
				)}
			<div ref={ref}>
				{loading && (
					<div className="flex flex-col gap-6">
						{Array.from({ length: 3 }).map((_, index) => (
							<PostSkeleton key={index} />
						))}
					</div>
				)}
				{data && data.posts.length === 0 && (
					<div className="text-center mb-4 bg-primary p-3 border border-post rounded">
						No posts
					</div>
				)}
				{data && data.posts.length > 0 && !hasMoreData && (
					<div className="text-center mb-4 bg-primary p-3 border border-post rounded text-primary">
						No more posts
					</div>
				)}
			</div>
		</div>
	);
};

export default Feed;
