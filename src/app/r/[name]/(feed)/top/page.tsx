import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';

export default async function CommunityTop({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;

	return (
		<>
			<FeedFilter highlighted="top" prefix={`r/${name}`} />
			<Feed sort="top" filter={{ community: { name: { equals: name } } }} />
		</>
	);
}
