import Feed from '@/components/feed-layout/Feed/Feed';

export default function UserOverview({
	params: { name },
}: {
	params: { name: string };
}) {
	return <Feed type="hot" authorName={name} />;
}
