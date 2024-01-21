import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';

export default function Hot() {
	return (
		<>
			<FeedFilter best highlighted="hot" />
			<Feed sort="hot" />
		</>
	);
}
