'use client';

import Post from '@/components/shared/Post/Post';
import useOverview from '@/hooks/query/useOverview';
import React, { useEffect } from 'react';
import CommentPreview from '../CommentPreview/CommentPreview';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import PostSkeleton from '@/components/shared/PostSkeleton/PostSkeleton';

interface OverviewFeedProps {
	name: string;
}

const OverviewFeed = ({ name }: OverviewFeedProps) => {
	const [ref, entry] = useIntersectionObserver<HTMLDivElement>();
	const { data, fetchMore, loading } = useOverview({
		variables: {
			name,
			first: 10,
		},
	});

	useEffect(() => {
		if (
			entry?.isIntersecting &&
			!loading &&
			data?.overview.pageInfo.hasNextPage
		) {
			fetchMore({
				variables: {
					after: data.overview.pageInfo.endCursor,
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					fetchMoreResult.overview.edges = [
						...prev.overview.edges,
						...fetchMoreResult.overview.edges,
					];
					return fetchMoreResult;
				},
			});
		}
	}, [entry, loading, fetchMore, data]);

	return (
		<div className="flex flex-col gap-2">
			{data &&
				data.overview.edges.map((item) =>
					item.node.__typename === 'Post' ? (
						<Post key={item.node.id} post={item.node} preview />
					) : (
						<CommentPreview key={item.node.id} comment={item.node} />
					)
				)}
			<div ref={ref}>
				{loading && (
					<div className="flex flex-col gap-6">
						{Array.from({ length: 2 }).map((_, index) => (
							<PostSkeleton key={index} />
						))}
					</div>
				)}
				{data && data.overview.edges.length === 0 && (
					<div className="text-center mb-4 bg-primary p-3 border border-post rounded">
						No posts and comments yet
					</div>
				)}
				{data &&
					data.overview.edges.length > 0 &&
					!data.overview.pageInfo.hasNextPage && (
						<div className="text-center mb-4 bg-primary p-3 border border-post rounded text-primary">
							No more posts and comments
						</div>
					)}
			</div>
		</div>
	);
};

export default OverviewFeed;
