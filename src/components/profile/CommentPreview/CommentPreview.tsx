import ShareModal from '@/components/shared/ShareModal/ShareModal';
import Button from '@/components/ui/Button/Button';
import { CommentWithPost } from '@/hooks/query/useComments';
import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';
import { ChatCircle } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useState } from 'react';

interface CommentPreviewProps {
	comment: CommentWithPost;
}

const CommentPreview = ({ comment }: CommentPreviewProps) => {
	const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
	const { push } = useRouter();

	const {
		id: commentId,
		content,
		author: { name: commentAuthor },
		createdAt,
		post: {
			id: postId,
			title,
			community: { name: communityName },
			author: { name: postAuthor },
		},
	} = comment;
	const postLink = `/r/${communityName}/comments/${postId}`;
	const commentLink = `${postLink}/${commentId}`;

	const goToPost = () => {
		push(postLink);
	};

	const goToComment = () => {
		push(commentLink);
	};

	const openShareModal = (event: MouseEvent) => {
		event.stopPropagation();
		setShareModalOpen(true);
	};

	const closeShareModal = () => {
		setShareModalOpen(false);
	};

	return (
		<div className="bg-primary">
			<ShareModal
				open={shareModalOpen}
				onClose={closeShareModal}
				path={commentLink}
			/>
			<div
				onClick={goToPost}
				className="flex p-2 border border-post hover:border-post-hover"
			>
				<ChatCircle
					size={20}
					className="mr-2 basis-5 flex-shrink-0 text-primary"
				/>
				<div className="flex items-center text-xs text-gray-400 flex-wrap">
					<Link
						href={`/user/${commentAuthor}`}
						className="text text-button mr-1 hover:underline"
					>
						{commentAuthor}
					</Link>
					<span className="mr-1">commented on </span>
					<span className="font-bold text-sm">{title}</span>
					<span className="mx-1 text-[6px] text-primary">•</span>
					<Link
						href={`/r/${communityName}`}
						className="text-primary hover:underline"
					>
						r/{communityName}
					</Link>
					<span className="mx-1 text-[6px] text-primary">•</span>
					<span className="mr-1">Posted by</span>
					<Link href={`/user/${postAuthor}`} className="hover:underline">
						u/{postAuthor}
					</Link>
				</div>
			</div>
			<div
				onClick={goToComment}
				className="py-2 px-4 border border-post border-t-transparent hover:border-post-hover"
			>
				<div className="border-dashed border-l-[2px] pl-4 text-primary">
					<div className="flex text-xs">
						<Link href="">{commentAuthor}</Link>
						<span className="mx-1 text-[6px] text-primary">•</span>
						<span className="text-gray-400">
							{calculateEllapsedTime(new Date(createdAt))}
						</span>
					</div>
					<div className="mb-1">
						<span className="font-light break-all">{content}</span>
					</div>
					<div className="text-xs flex gap-2">
						<Link href={commentLink}>
							<Button variant="text" size="small" shape="square">
								Reply
							</Button>
						</Link>
						<Button
							onClick={openShareModal}
							variant="text"
							size="small"
							shape="square"
						>
							Share
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentPreview;
