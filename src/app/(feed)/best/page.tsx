import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';

export default function Best() {
	return (
		<>
			<FeedFilter best highlighted="best" />
			<Feed sort="hot" />
		</>
	);
}
