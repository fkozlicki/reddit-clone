'use client';

import VoteSection from '@/components/shared/VoteSection/VoteSection';
import Button from '@/components/ui/Button/Button';
import { PostInfo } from '@/hooks/query/usePosts';
import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';
import {
	BookmarkIcon,
	ChatBubbleLeftIcon,
	EllipsisHorizontalIcon,
	ShareIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface PostProps {
	post: PostInfo;
	refetch: 'Post' | 'Posts';
}

const Post = ({ post, refetch }: PostProps) => {
	const { data: session } = useSession();
	const {
		votes,
		community: { name: communityName },
		author: { name: authorName },
		createdAt,
		id,
		title,
		content,
		comments,
	} = post;
	const karma = votes.reduce((acc, vote) => acc + vote.value, 0);
	const userVote = votes.find((vote) => vote.userId === session?.user.id);
	const commentsCount = comments.length;

	return (
		<div className="w-full flex border-post border rounded hover:border-post-hover cursor-pointer overflow-hidden bg-primary">
			<div className="bg-post-side p-2 hidden sm:block">
				<VoteSection
					type="post"
					postId={id}
					direction="column"
					karma={karma}
					vote={userVote}
					refetch={refetch}
				/>
			</div>
			<div className="bg-primary flex-1">
				<div className="flex items-center p-2">
					<div className="w-5 h-5 rounded-full bg-black"></div>
					<Link
						href={`/r/${communityName}`}
						className="text-xs font-semibold ml-1 hover:underline text-primary"
					>
						r/{communityName}
					</Link>
					<span className="mx-1 text-[6px] text-primary">•</span>
					<span className="text-xs text-primary">Posted by</span>
					<Link
						href={`/user/${authorName}`}
						className="text-xs ml-1 hover:underline text-primary"
					>
						u/{authorName}
					</Link>
					<span className="text-xs ml-1 text-primary">
						{calculateEllapsedTime(new Date(createdAt))}
					</span>
				</div>
				<Link href={`/r/${communityName}/comments/${id}`}>
					<div className="px-2 pb-2 text-lg font-bold text-primary">
						{title}
					</div>
					<p className="px-2 pb-2 text-primary">{content}</p>
				</Link>
				<div className="px-2 flex pb-1 gap-2">
					<div className="sm:hidden flex items-center">
						<VoteSection
							type="post"
							postId={id}
							direction="column"
							karma={karma}
							vote={userVote}
							refetch={refetch}
						/>
					</div>
					<Link className="flex" href={`/r/${communityName}/comments/${id}`}>
						<Button
							variant="secondary"
							icon={<ChatBubbleLeftIcon width={18} />}
							shape="square"
							className="text-xs"
						>
							{commentsCount} Comment{commentsCount > 1 && 's'}
						</Button>
					</Link>
					<Button
						variant="secondary"
						icon={<ShareIcon width={18} />}
						shape="square"
						className="text-xs"
					>
						Share
					</Button>
					<Button
						variant="secondary"
						shape="square"
						className="text-xs"
						icon={<BookmarkIcon width={18} />}
					>
						Save
					</Button>
					<Button
						variant="secondary"
						shape="square"
						className="text-xs"
						icon={<EllipsisHorizontalIcon width={18} />}
					/>
				</div>
			</div>
		</div>
	);
};

export default Post;
