'use client';

import React, { useState } from 'react';
import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';
import IconButton from '../buttons/IconButton/IconButton';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import VoteSection from '../VoteSection/VoteSection';
import { CommentVote } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { InitialComment } from '../CommentsSection/CommentsSection';
import CommentForm from '../CommentForm/CommentForm';
import { useParams } from 'next/navigation';

interface CommentProps {
	id: string;
	authorName: string | null;
	createdAt: Date;
	content: string;
	votes: CommentVote[];
	initialReplies?: Omit<InitialComment, 'replies'>[];
}

const Comment = ({
	id,
	authorName,
	content,
	createdAt,
	votes,
	initialReplies,
}: CommentProps) => {
	const params = useParams();
	const { data: session } = useSession();
	const [replies, setReplies] = useState(initialReplies || []);
	const [replyFormOpen, setReplyFormOpen] = useState(false);
	const karma = votes.reduce((acc, vote) => acc + vote.value, 0);
	const userVote = votes.find((vote) => vote.userId === session?.user.id);
	const postId = params.id as string;

	const updateReplies = (reply: InitialComment) => {
		setReplies((prev) => [reply, ...prev]);
	};

	const toggleReplyFormOpen = () => {
		setReplyFormOpen((prev) => !prev);
	};

	return (
		<div className="flex gap-2">
			<div className="flex flex-col items-center">
				<div className="w-6 h-6 bg-black rounded-full"></div>
				<div className="w-px flex-1 bg-border-post"></div>
			</div>
			<div className="flex-1">
				<div className="mb-2">
					<div className="flex items-center">
						<div className="text-xs">{authorName}</div>
						<div className="text-text-gray mx-1">·</div>
						<div className="text-xs text-text-gray">
							{calculateEllapsedTime(new Date(createdAt))}
						</div>
					</div>
					<div className="mb-2">{content}</div>
					<div className="flex items-center gap-1">
						<VoteSection
							type="comment"
							commentId={id}
							direction="row"
							initialKarma={karma}
							initialVote={userVote}
						/>
						<IconButton
							shape="square"
							text="Reply"
							icon={<ChatBubbleLeftIcon width={18} />}
							color="text-text-gray"
							fontSize="text-xs"
							onClick={toggleReplyFormOpen}
						/>
					</div>
				</div>
				<div>
					{replyFormOpen && (
						<div className="mb-2">
							<CommentForm
								postId={postId}
								updateComments={updateReplies}
								replyToId={id}
							/>
						</div>
					)}
					{replies &&
						replies.map((reply, index) => (
							<Comment
								key={index}
								authorName={reply.author.name}
								content={reply.content}
								createdAt={reply.createdAt}
								id={reply.id}
								votes={reply.votes}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default Comment;
