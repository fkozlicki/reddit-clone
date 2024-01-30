import Feed from '@/components/feed-layout/Feed/Feed';

export default function UserSavedPosts({
	params: { name },
}: {
	params: { name: string };
}) {
	return <Feed filter={{ saved: { some: { user: { name } } } }} sort="new" />;
}
