'use client';

import React from 'react';
import {
	BookmarkIcon,
	ChatBubbleLeftIcon,
	EllipsisHorizontalIcon,
	ShareIcon,
} from '@heroicons/react/24/outline';
import { Comment, Community, User, Vote } from '@prisma/client';
import IconButton from '../buttons/IconButton/IconButton';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import VoteSection from '../VoteSection/VoteSection';
import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';

interface PostProps {
	id: string;
	title: string;
	content: string;
	authorName: User['name'];
	createdAt: Date;
	votes: Vote[];
	comments: Comment[];
	communityName: Community['name'];
	search?: string;
}

const Post = ({
	id,
	title,
	content,
	votes,
	authorName,
	createdAt,
	communityName,
	comments,
}: PostProps) => {
	const { data: session } = useSession();

	const karma = votes.reduce((acc, vote) => acc + vote.value, 0);
	const userVote = votes.find((vote) => vote.userId === session?.user.id);

	return (
		<div className="w-full flex border-border-post border rounded hover:border-border-post-hover cursor-pointer overflow-hidden">
			<div className="bg-background-post-side p-2 hidden sm:block">
				<VoteSection
					type="post"
					postId={id}
					direction="column"
					initialKarma={karma}
					initialVote={userVote}
				/>
			</div>
			<div className="bg-background-primary flex-1">
				<div className="flex items-center p-2">
					<div className="w-5 h-5 rounded-full bg-primary"></div>
					<Link
						href={`/r/${communityName}`}
						className="text-xs font-semibold ml-1 hover:underline"
					>
						r/{communityName}
					</Link>
					<span className="mx-1 text-[6px]">•</span>
					<span className="text-xs">Posted by</span>
					<Link
						href={`/user/${authorName}`}
						className="text-xs ml-1 hover:underline"
					>
						u/{authorName}
					</Link>
					<span className="text-xs ml-1">
						{calculateEllapsedTime(new Date(createdAt))}
					</span>
				</div>
				<Link href={`/r/${communityName}/comments/${id}`}>
					<div className="px-2 pb-2 text-lg font-bold">{title}</div>
					<p className="px-2 pb-2">{content}</p>
				</Link>
				<div className="px-2 flex pb-1 gap-2">
					<div className="sm:hidden flex items-center">
						<VoteSection
							type="post"
							postId={id}
							direction="row"
							initialKarma={karma}
							initialVote={userVote}
						/>
					</div>
					<IconButton
						shape="square"
						icon={<ChatBubbleLeftIcon width={20} />}
						text={`${comments.length} Comments`}
						color="text-text-gray"
						fontSize="text-[12px]"
						href={`/r/${communityName}/comments/${id}`}
					/>
					<IconButton
						shape="square"
						icon={<ShareIcon width={20} />}
						text="Share"
						color="text-text-gray"
						fontSize="text-[12px]"
					/>
					<IconButton
						shape="square"
						icon={<BookmarkIcon width={20} />}
						text="Save"
						color="text-text-gray"
						fontSize="text-[12px]"
					/>
					<IconButton
						shape="square"
						icon={<EllipsisHorizontalIcon width={20} />}
						color="text-text-gray"
					/>
				</div>
			</div>
		</div>
	);
};

export default Post;
