'use client';

import { CommentVote, Comment as PrismaComment, User } from '@prisma/client';
import React, { useState } from 'react';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm';

export type InitialComment = PrismaComment & {
	author: User;
	votes: CommentVote[];
	replies: Omit<InitialComment, 'replies'>[];
};

interface CommentsSectionProps {
	initialComments: InitialComment[];
	postId: string;
}

const CommentsSection = ({ initialComments, postId }: CommentsSectionProps) => {
	const [comments, setComments] = useState<InitialComment[]>(initialComments);

	const updateComments = (newComment: InitialComment) => {
		setComments((prev) => [newComment, ...prev]);
	};

	return (
		<div className="bg-background-primary py-5 px-4">
			<div className="mx-8">
				<CommentForm postId={postId} updateComments={updateComments} />
			</div>
			<div className="w-full h-5" />
			{comments.map((comment) => (
				<Comment
					id={comment.id}
					votes={comment.votes}
					authorName={comment.author.name}
					content={comment.content}
					createdAt={comment.createdAt}
					key={comment.id}
					initialReplies={comment.replies}
				/>
			))}
		</div>
	);
};

export default CommentsSection;
