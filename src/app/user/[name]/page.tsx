import OverviewFeed from '@/components/profile/OverviewFeed/OverviewFeed';

export default function User({
	params: { name },
}: {
	params: { name: string };
}) {
	return <OverviewFeed name={name} />;
}
