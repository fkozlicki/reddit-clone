import { CommentWithPost } from '@/hooks/query/useComments';
import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface CommentPreviewProps {
	comment: CommentWithPost;
}

const CommentPreview = ({ comment }: CommentPreviewProps) => {
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

	const goToPost = () => {
		push(postLink);
	};

	const goToComment = () => {
		push(`${postLink}/${commentId}`);
	};

	return (
		<div className="bg-primary">
			<div
				onClick={goToPost}
				className="flex p-2 border border-b-input hover:border hover:border-post"
			>
				<ChatBubbleLeftIcon width={20} className="mr-2 basis-5 flex-shrink-0" />
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
				className="py-2 px-4 border border-t-transparent hover:border-post"
			>
				<div className="border-dashed border-l-[2px] pl-4">
					<div className="flex text-xs">
						<Link href="">{commentAuthor}</Link>
						<span className="mx-1 text-[6px] text-primary">•</span>
						<span className="text-gray-400">
							{calculateEllapsedTime(new Date(createdAt))}
						</span>
					</div>
					<div className="font-light mb-1">{content}</div>
					<div className="text-xs flex gap-2">
						<Link href="">Reply</Link>
						<Link href="">Share</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentPreview;
