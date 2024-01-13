'use client';

import CommentForm from '@/components/community/CommentForm/CommentForm';
import VoteSection from '@/components/shared/VoteSection/VoteSection';
import Avatar from '@/components/ui/Avatar/Avatar';
import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import { PostComment } from '@/hooks/query/usePost';
import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface CommentProps {
	comment: PostComment;
}

const Comment = ({ comment }: CommentProps) => {
	const [, dispatch] = useModalsContext();
	const params = useParams();
	const { data: session } = useSession();
	const [replyFormOpen, setReplyFormOpen] = useState(false);

	const postId = params.id as string;

	const {
		author: { name: authorName },
		createdAt,
		content,
		id,
		votes,
		replies,
	} = comment;
	const karma = votes.reduce((acc, vote) => acc + vote.value, 0);
	const userVote = votes.find((vote) => vote.userId === session?.user.id);

	const toggleReplyFormOpen = () => {
		setReplyFormOpen((prev) => !prev);
	};

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	return (
		<div className="flex gap-2">
			<div className="flex flex-col items-center">
				<Avatar size={24} />
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
							karma={karma}
							vote={userVote}
							refetch="Post"
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
							<CommentForm postId={postId} replyToId={id} />
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
