'use client';

import VoteSection from '@/components/shared/VoteSection/VoteSection';
import Avatar from '@/components/ui/Avatar/Avatar';
import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import { PostComment } from '@/hooks/query/usePost';
import { cn } from '@/lib/utils';
import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';
import { ChatCircle } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const CommentForm = dynamic(
	() => import('@/components/community/CommentForm/CommentForm')
);

interface CommentProps {
	comment: PostComment;
	highlight?: boolean;
}

const Comment = ({ comment, highlight }: CommentProps) => {
	const [, dispatch] = useModalsContext();
	const { data: session } = useSession();
	const [replyFormOpen, setReplyFormOpen] = useState(false);

	const {
		author: { name: authorName, image },
		createdAt,
		content,
		id,
		replies,
		karma,
		voteValue,
	} = comment;

	const toggleReplyFormOpen = () => {
		setReplyFormOpen((prev) => !prev);
	};

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	return (
		<div
			className={cn('flex gap-2', { 'bg-blue-600/10 py-3 px-2': highlight })}
		>
			<div className="flex flex-col items-center">
				<Avatar size={24} url={image} alt="avatar" />
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
					<div className="mb-2 text-primary break-all">{content}</div>
					<div className="flex items-center gap-1">
						<VoteSection
							type="comment"
							comment={comment}
							direction="row"
							karma={karma}
							voteValue={voteValue}
						/>
						<Button
							variant="text"
							className="rounded"
							icon={<ChatCircle size={18} />}
							onClick={session ? toggleReplyFormOpen : openSignIn}
						>
							Reply
						</Button>
					</div>
				</div>
				<div>
					{replyFormOpen && (
						<div className="mb-2">
							<CommentForm postId={comment.postId} replyToId={id} />
						</div>
					)}
					{replies?.map((reply, index) => (
						<Comment key={index} comment={reply} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Comment;
