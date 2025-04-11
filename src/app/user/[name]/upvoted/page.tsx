import Feed from '@/components/feed-layout/Feed/Feed';
import React from 'react';

export default async function UserUpvotedPosts({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;

	return <Feed filter={{ votes: { some: { user: { name }, value: 1 } } }} />;
}
