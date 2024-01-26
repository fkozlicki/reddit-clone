import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';

export default async function CommunityTop({
	params: { name },
}: {
	params: { name: string };
}) {
	return (
		<>
			<FeedFilter highlighted="top" prefix={`r/${name}`} />
			<Feed sort="top" filter={{ community: { name: { equals: name } } }} />
		</>
	);
}
