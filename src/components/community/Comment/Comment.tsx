'use client';

import React, { useState } from 'react';
import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useModalsContext } from '@/contexts/ModalsContext';
import { CommentReply, PostVote } from '@/hooks/query/usePost';
import Button from '@/components/ui/Button/Button';
import CommentForm from '@/components/community/CommentForm/CommentForm';
import VoteSection from '@/components/shared/VoteSection/VoteSection';

interface CommentProps {
	id: string;
	authorName: string | null;
	createdAt: Date;
	content: string;
	votes?: PostVote[];
	initialReplies?: CommentReply[];
}

const Comment = ({
	id,
	authorName,
	content,
	createdAt,
	votes,
	initialReplies,
}: CommentProps) => {
	const [, dispatch] = useModalsContext();
	const params = useParams();
	const { data: session } = useSession();
	const [replies, setReplies] = useState(initialReplies || []);
	const [replyFormOpen, setReplyFormOpen] = useState(false);
	const karma = votes?.reduce((acc, vote) => acc + vote.value, 0);
	const userVote = votes?.find((vote) => vote.userId === session?.user.id);
	const postId = params.id as string;

	const updateReplies = (reply: CommentReply) => {
		setReplies((prev) => [reply, ...prev]);
	};

	const toggleReplyFormOpen = () => {
		setReplyFormOpen((prev) => !prev);
	};

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	return (
		<div className="flex gap-2">
			<div className="flex flex-col items-center">
				<div className="w-6 h-6 bg-black rounded-full"></div>
				<div className="w-0.5 flex-1 bg-gray-600"></div>
			</div>
			<div className="flex-1">
				<div className="mb-2">
					<div className="flex items-center  text-primary">
						<div className="text-xs">{authorName}</div>
						<div className="text-primary mx-1">·</div>
						<div className="text-xs text-primary">
							{calculateEllapsedTime(new Date(createdAt))}
						</div>
					</div>
					<div className="mb-2 text-primary">{content}</div>
					<div className="flex items-center gap-1">
						<VoteSection
							type="comment"
							commentId={id}
							direction="row"
							initialKarma={karma ?? 0}
							initialVote={userVote}
						/>
						<Button
							variant="secondary"
							className="rounded"
							icon={<ChatBubbleLeftIcon width={18} />}
							onClick={session ? toggleReplyFormOpen : openSignIn}
						>
							Reply
						</Button>
					</div>
				</div>
				<div>
					{replyFormOpen && (
						<div className="mb-2">
							<CommentForm
								postId={postId}
								updateReplies={updateReplies}
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
