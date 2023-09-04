import React from 'react';
import Grid from '../Grid/Grid';
import FeedFilter, { FeedFilterProps } from '../FeedFilter/FeedFilter';
import Feed from '../Feed/Feed';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Trending from '../Trending/Trending';
import CreatePost from '../CreatePost/CreatePost';
import { DocumentNode } from 'graphql';
import PremiumCTA from '../PremiumCTA/PremiumCTA';
import HomeCTA from '../HomeCTA/HomeCTA';
import VoteSection from '../VoteSection/VoteSection';
import PostSkeleton from '../PostSkeleton/PostSkeleton';
import { FeedType } from '@/hooks/query/usePosts';

interface HomeScreenProps {
	feedType: FeedType;
	highlighted: FeedFilterProps['highlighted'];
}

const HomeScreen = async ({ feedType, highlighted }: HomeScreenProps) => {
	const session = await getServerSession(authOptions);

	return (
		<div className="flex-1 bg-secondary min-h-[calc(100vh-48px)]">
			{!session && <Trending />}
			<Grid
				left={
					<>
						{session && <CreatePost />}
						{!session && (
							<div className="text-sm font-medium mb-2">Popular posts</div>
						)}
						<FeedFilter best highlighted={highlighted} />
						<Feed type={feedType} />
					</>
				}
				right={
					<>
						{!session && <div className="h-7" />}
						<PremiumCTA />
						<HomeCTA />
					</>
				}
			/>
		</div>
	);
};

export default HomeScreen;
