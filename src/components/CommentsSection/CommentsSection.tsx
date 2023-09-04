'use client';

import React, { useState } from 'react';
import Comment from '../Comment/Comment';
import CommentForm from '../forms/CommentForm/CommentForm';
import { PostComment } from '@/hooks/query/usePost';

interface CommentsSectionProps {
	initialComments: PostComment[];
	postId: string;
}

const CommentsSection = ({ initialComments, postId }: CommentsSectionProps) => {
	const [comments, setComments] =
		useState<(PostComment | Omit<PostComment, 'replies' | 'votes'>)[]>(
			initialComments
		);

	const updateComments = (
		newComment: PostComment | Omit<PostComment, 'replies' | 'votes'>
	) => {
		setComments((prev) => [newComment, ...prev]);
	};

	return (
		<div className="bg-primary py-5 px-4 flex-1 border border-post rounded">
			<div className="mx-8">
				<CommentForm postId={postId} updateComments={updateComments} />
			</div>
			<div className="w-full h-5" />
			{comments.length > 0 ? (
				comments.map((comment) => (
					<Comment
						id={comment.id}
						votes={'votes' in comment ? comment.votes : undefined}
						authorName={comment.author.name}
						content={comment.content}
						createdAt={comment.createdAt}
						key={comment.id}
						initialReplies={'replies' in comment ? comment.replies : undefined}
					/>
				))
			) : (
				<div className="text-center">No comments yet.</div>
			)}
		</div>
	);
};

export default CommentsSection;
