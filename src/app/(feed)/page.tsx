import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';
import { TOPICS_QUERY } from '@/hooks/query/useTopics';
import { PreloadQuery } from '@/lib/apollo';

export default async function Home() {
	return (
		<PreloadQuery query={TOPICS_QUERY}>
			<FeedFilter best highlighted="best" />
			<Feed sort="hot" />
		</PreloadQuery>
	);
}
