import Feed from '@/components/feed-layout/Feed/Feed';

export default async function UserSavedPosts({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;

	return <Feed filter={{ saved: { some: { user: { name } } } }} sort="new" />;
}
