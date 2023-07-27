import { getServerSession } from 'next-auth';
import Trending from '@/components/Trending/Trending';
import PremiumCTA from '@/components/PremiumCTA/PremiumCTA';
import HomeCTA from '@/components/HomeCTA/HomeCTA';
import FeedFilter from '@/components/FeedFilter/FeedFilter';
import Post from '@/components/Post/Post';
import CreatePost from '@/components/CreatePost/CreatePost';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Hot() {
	const session = await getServerSession(authOptions);
	const oneDayAgo = new Date();
	oneDayAgo.setHours(oneDayAgo.getHours() - 24);
	const posts = await prisma?.post.findMany({
		where: {
			createdAt: {
				gte: oneDayAgo,
				lte: new Date(),
			},
		},
		orderBy: [
			{
				comments: {
					_count: 'desc',
				},
			},
		],
		include: {
			author: true,
			community: true,
			votes: true,
			comments: true,
		},
	});

	return (
		<div className="flex-1 bg-background-feed min-h-[calc(100vh-48px)]">
			{!session && <Trending />}
			<div className="flex gap-6 justify-center sm:px-6 pt-6">
				<div className="w-full lg:max-w-[640px]">
					{session && <CreatePost />}
					{!session && (
						<div className="text-sm font-medium mb-2">Popular posts</div>
					)}
					<FeedFilter best highlighted="hot" />
					{posts &&
						posts.map(
							({
								id,
								author,
								content,
								title,
								createdAt,
								votes,
								comments,
								community,
							}) => (
								<Post
									key={id}
									id={id}
									authorName={author.name}
									content={content}
									title={title}
									createdAt={createdAt}
									votes={votes}
									comments={comments}
									communityName={community.name}
								/>
							)
						)}
				</div>
				<div className="w-[312px] hidden lg:block flex-shrink-0">
					{!session && <div className="h-7" />}
					<PremiumCTA />
					<HomeCTA />
				</div>
			</div>
		</div>
	);
}
