'use client';

import Wrapper from '@/components/Wrapper';
import VoteSection from '@/components/shared/VoteSection/VoteSection';
import Avatar from '@/components/ui/Avatar/Avatar';
import Button from '@/components/ui/Button/Button';
import useSavePost from '@/hooks/mutation/useSavePost';
import {
	POSTS_QUERY,
	PostInfo,
	PostsQueryResponse,
} from '@/hooks/query/usePosts';
import { cn } from '@/lib/utils';
import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';
import {
	BookmarkIcon as BookmarkIconOutline,
	ChatBubbleLeftIcon,
	EllipsisHorizontalIcon,
	ShareIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { randomBytes } from 'crypto';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface PostProps {
	post: PostInfo;
	preview?: boolean;
}

const Post = ({ post, preview }: PostProps) => {
	const { data: session } = useSession();
	const [savePost, { loading: saveLoading }] = useSavePost({
		variables: {
			id: post.id,
		},
		update: (cache, result) => {
			cache.updateQuery<PostsQueryResponse>(
				{
					query: POSTS_QUERY,
					variables: {
						first: 5,
						filter: {
							savedBy: { some: { name: session?.user.name } },
						},
					},
				},
				(data) => {
					if (!data || !result.data) {
						return null;
					}
					const saved = result.data?.save.savedBy.some(
						(user) => user.id === session?.user.id
					);

					return {
						...data,
						posts: {
							...data.posts,
							edges: saved
								? [
										{
											cursor: randomBytes(32).toString('base64'),
											node: result.data?.save,
										},
										...data.posts.edges,
								  ]
								: data.posts.edges.filter(
										(edge) => edge.node.id !== result.data?.save.id
								  ),
						},
					};
				}
			);
		},
	});
	const {
		votes,
		community: { name: communityName },
		author: { name: authorName, image: authorAvatar },
		createdAt,
		id,
		title,
		content,
		comments,
		savedBy,
	} = post;
	const karma = votes.reduce((acc, vote) => acc + vote.value, 0);
	const userVote = votes.find((vote) => vote.userId === session?.user.id);
	const commentsCount = comments.length;

	const saved =
		session && savedBy.map((user) => user.id).includes(session.user.id);

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
				/>
			</div>
			<div className="bg-primary flex-1">
				<div className="flex p-2">
					<Link
						href={`/r/${communityName}`}
						className="mr-1 shrink-0"
						aria-label="Community"
					>
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
						<div
							className="px-2 pb-2 text-primary [&>ul]:ml-4 [&>ul]:list-disc [&>ol]:ml-4 [&>ol]:list-decimal [&>p>code]:bg-secondary [&>p>code]:text-xs [&>p>code]:px-1 [&>p>code]:py-1 [&>p>code]:rounded"
							dangerouslySetInnerHTML={{
								__html: content,
							}}
						/>
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
						className={cn('text-xs hidden sm:inline-block', {
							'text-yellow-500 font-bold': saved,
						})}
						icon={
							saved ? (
								<BookmarkIconSolid width={18} />
							) : (
								<BookmarkIconOutline width={18} />
							)
						}
						onClick={() => savePost()}
						loading={saveLoading}
					>
						{saved ? 'Unsave' : 'Save'}
					</Button>
					<Button
						aria-label="More options"
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
