import Feed from '@/components/feed-layout/Feed/Feed';
import React from 'react';

export default async function UserPosts({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;

	return <Feed sort="new" filter={{ author: { name } }} />;
}
