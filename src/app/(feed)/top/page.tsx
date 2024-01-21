import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';

export default function Top() {
	return (
		<>
			<FeedFilter best highlighted="top" />
			<Feed sort="top" />
		</>
	);
}
