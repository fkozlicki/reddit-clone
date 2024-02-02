'use client';

import useComments from '@/hooks/query/useComments';
import React from 'react';
import CommentPreview from '../CommentPreview/CommentPreview';
import CommentSkeleton from '../CommentSkeleton/CommentSkeleton';

interface CommentsFeedProps {
	userName: string;
}

const CommentsFeed = ({ userName }: CommentsFeedProps) => {
	const { data, loading, error } = useComments({
		variables: {
			filter: { author: { name: userName } },
			sort: 'new',
		},
	});

	if (error) {
		return <div>Could not load data</div>;
	}

	return (
		<div className="flex flex-col gap-4">
			{data && (
				<>
					{data.comments.length > 0 ? (
						<>
							{data.comments.map((comment) => (
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
			{loading && (
				<div>
					<div className="flex flex-col gap-4">
						{Array.from({ length: 5 }).map((_, index) => (
							<CommentSkeleton key={index} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentsFeed;
