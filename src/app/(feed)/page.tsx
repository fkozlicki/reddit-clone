import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';
import { POSTS_QUERY } from '@/hooks/query/usePosts';
import { PreloadQuery } from '@/lib/apollo';

export default function Home() {
	return (
		<PreloadQuery query={POSTS_QUERY}>
			<FeedFilter best highlighted="best" />
			<Feed sort="hot" />
		</PreloadQuery>
	);
}
