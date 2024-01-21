import Feed from '@/components/feed-layout/Feed/Feed';

export default function UserDownvotedPosts({
	params: { name },
}: {
	params: { name: string };
}) {
	return <Feed filter={{ votes: { some: { user: { name }, value: -1 } } }} />;
}
