import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';

export default async function CommunityHot({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;

	return (
		<>
			<FeedFilter highlighted="hot" prefix={`r/${name}`} />
			<Feed sort="hot" filter={{ community: { name: { equals: name } } }} />
		</>
	);
}
