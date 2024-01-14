import Feed from '@/components/feed-layout/Feed/Feed';

export default function User({
	params: { name },
}: {
	params: { name: string };
}) {
	return <Feed type="hot" authorName={name} />;
}
