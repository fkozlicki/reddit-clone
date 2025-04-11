import OverviewFeed from '@/components/profile/OverviewFeed/OverviewFeed';

export default async function User({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;

	return <OverviewFeed name={name} />;
}
