'use client';

import useComments from '@/hooks/query/useComments';
import React, { useEffect } from 'react';
import CommentPreview from '../CommentPreview/CommentPreview';
import CommentSkeleton from '../CommentSkeleton/CommentSkeleton';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface CommentsFeedProps {
	userName: string;
}

const CommentsFeed = ({ userName }: CommentsFeedProps) => {
	const { data, loading, fetchMore } = useComments({
		variables: {
			first: 10,
			filter: { author: { name: userName } },
			sort: 'new',
		},
	});
	const [ref, entry] = useIntersectionObserver<HTMLDivElement>();

	useEffect(() => {
		if (
			entry?.isIntersecting &&
			!loading &&
			data?.comments.pageInfo.hasNextPage
		) {
			fetchMore({
				variables: {
					after: data.comments.pageInfo.endCursor,
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					fetchMoreResult.comments.edges = [
						...prev.comments.edges,
						...fetchMoreResult.comments.edges,
					];
					return fetchMoreResult;
				},
			});
		}
	}, [entry, loading, fetchMore, data]);

	return (
		<div className="flex flex-col gap-4">
			{data && (
				<>
					{data.comments.edges.length > 0 ? (
						<>
							{data.comments.edges.map(({ node: comment }) => (
								<CommentPreview key={comment.id} comment={comment} />
							))}
							{!loading && (
								<div className="text-center mb-4 bg-primary p-3 border border-post rounded text-primary">
									No more comments
								</div>
							)}
						</>
					) : (
						<div className="text-center mb-4 bg-primary p-3 border border-post rounded text-primary">
							No comments
						</div>
					)}
				</>
			)}
			<div ref={ref}>
				{loading && (
					<div className="flex flex-col gap-4">
						{Array.from({ length: 5 }).map((_, index) => (
							<CommentSkeleton key={index} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentsFeed;
