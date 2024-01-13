'use client';

import useComments from '@/hooks/query/useComments';
import React from 'react';
import CommentPreview from '../CommentPreview/CommentPreview';

interface CommentsFeedProps {
	userName: string;
}

const CommentsFeed = ({ userName }: CommentsFeedProps) => {
	const { data, loading, error } = useComments({
		variables: {
			filter: { author: { name: userName } },
		},
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Could not load data</div>;
	}

	return (
		<div className="flex flex-col gap-2">
			{data?.comments.map((comment) => (
				<CommentPreview key={comment.id} comment={comment} />
			))}
		</div>
	);
};

export default CommentsFeed;
