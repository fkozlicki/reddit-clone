import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { FeedType } from '@/hooks/query/usePosts';
import { getServerSession } from 'next-auth';
import CreatePost from '../feed-layout/CreatePost/CreatePost';
import Feed from '../feed-layout/Feed/Feed';
import FeedFilter, {
	FeedFilterProps,
} from '../feed-layout/FeedFilter/FeedFilter';
import HomeCTA from '../feed-layout/HomeCTA/HomeCTA';
import PremiumCTA from '../feed-layout/PremiumCTA/PremiumCTA';
import Grid from '../ui/Grid/Grid';

interface FeedViewProps {
	feedType: FeedType;
	highlighted: FeedFilterProps['highlighted'];
}

const FeedView = async ({ feedType, highlighted }: FeedViewProps) => {
	const session = await getServerSession(authOptions);

	return (
		<div className="px-4 py-6">
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

export default FeedView;
