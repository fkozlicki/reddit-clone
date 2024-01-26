import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';

export default function Community({
	params: { name },
}: {
	params: { name: string };
}) {
	return (
		<>
			<FeedFilter highlighted="hot" prefix={`r/${name}`} />
			<Feed sort="hot" filter={{ community: { name: { equals: name } } }} />
		</>
	);
}
