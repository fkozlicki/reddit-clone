import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';

export default async function CommunityNew({
	params: { name },
}: {
	params: { name: string };
}) {
	return (
		<>
			<FeedFilter highlighted="new" prefix={`r/${name}`} />
			<Feed sort="new" filter={{ community: { name: { equals: name } } }} />
		</>
	);
}
