import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';

export default async function New() {
	return (
		<>
			<FeedFilter best highlighted="new" />
			<Feed sort="new" />
		</>
	);
}
