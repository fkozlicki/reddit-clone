import Feed from '@/components/feed-layout/Feed/Feed';

export default async function UserDownvotedPosts({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;

	return <Feed filter={{ votes: { some: { user: { name }, value: -1 } } }} />;
}
