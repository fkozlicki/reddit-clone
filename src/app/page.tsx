import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Trending from '@/components/Trending/Trending';
import PremiumCTA from '@/components/PremiumCTA/PremiumCTA';
import HomeCTA from '@/components/HomeCTA/HomeCTA';
import FeedFilter from '@/components/FeedFilter/FeedFilter';
import CreatePost from '@/components/CreatePost/CreatePost';
import Feed from '@/components/Feed/Feed';

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<div className="flex-1 bg-background-feed min-h-[calc(100vh-48px)]">
			{!session && <Trending />}
			<div className="flex gap-6 justify-center sm:px-6 pt-6">
				<div className="w-full lg:max-w-[640px]">
					{session && <CreatePost />}
					{!session && (
						<div className="text-sm font-medium mb-2">Popular posts</div>
					)}
					<FeedFilter best highlighted="best" />
					<Feed />
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
