'use client';

import Wrapper from '@/components/Wrapper';
import VoteSection from '@/components/shared/VoteSection/VoteSection';
import Avatar from '@/components/ui/Avatar/Avatar';
import Button from '@/components/ui/Button/Button';
import { PostInfo } from '@/hooks/query/usePosts';
import { cn } from '@/lib/utils';
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
	refetch: 'Post' | 'Posts' | 'Overview';
	preview?: boolean;
}

const Post = ({ post, refetch, preview }: PostProps) => {
	const { data: session } = useSession();
	const {
		votes,
		community: { name: communityName },
		author: { name: authorName, image: authorAvatar },
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
		<div
			className={cn(
				'w-full flex border-post border rounded overflow-hidden bg-primary',
				{ 'hover:border-post-hover cursor-pointer': preview }
			)}
		>
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
				<div className="flex p-2">
					<Link href={`/r/${communityName}`} className="mr-1">
						<Avatar size={20} url={authorAvatar} alt="post author avatar" />
					</Link>
					<div className="flex items-center flex-wrap">
						<Link
							href={`/r/${communityName}`}
							className="text-xs font-semibold hover:underline text-primary"
						>
							r/{communityName}
						</Link>
						<span className="mx-1 text-[6px] text-primary">•</span>
						<span className="text-xs text-primary mr-1">Posted by</span>
						<Link
							href={`/user/${authorName}`}
							className="text-xs mr-1 hover:underline text-primary"
						>
							u/{authorName}
						</Link>
						<span className="text-xs text-primary">
							{calculateEllapsedTime(new Date(createdAt))}
						</span>
					</div>
				</div>
				<Wrapper
					condition={!!preview}
					wrap={(children) => (
						<Link href={`/r/${communityName}/comments/${id}`}>{children}</Link>
					)}
				>
					<>
						<div className="px-2 pb-2 text-lg font-bold text-primary">
							{title}
						</div>
						<p className="px-2 pb-2 text-primary">{content}</p>
					</>
				</Wrapper>
				<div className="px-2 flex pb-1 gap-2">
					<div className="sm:hidden flex items-center">
						<VoteSection
							type="post"
							postId={id}
							direction="row"
							karma={karma}
							vote={userVote}
							refetch={refetch}
						/>
					</div>
					<Wrapper
						condition={!!preview}
						wrap={(children) => (
							<Link href={`/r/${communityName}/comments/${id}`}>
								{children}
							</Link>
						)}
					>
						<Button
							variant="secondary"
							icon={<ChatBubbleLeftIcon width={18} />}
							shape="square"
							className="text-xs"
						>
							{commentsCount} Comment{commentsCount > 1 && 's'}
						</Button>
					</Wrapper>
					<Button
						variant="secondary"
						icon={<ShareIcon width={18} />}
						shape="square"
						className="text-xs hidden sm:inline-block"
					>
						Share
					</Button>
					<Button
						variant="secondary"
						shape="square"
						className="text-xs hidden sm:inline-block"
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
