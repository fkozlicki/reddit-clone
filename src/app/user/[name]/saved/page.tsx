import Feed from '@/components/feed-layout/Feed/Feed';

export default function UserSavedPosts({
	params: { name },
}: {
	params: { name: string };
}) {
	return <Feed filter={{ savedBy: { some: { name } } }} />;
}
