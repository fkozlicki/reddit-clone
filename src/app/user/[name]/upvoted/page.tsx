import Feed from '@/components/feed-layout/Feed/Feed';
import React from 'react';

export default function UserUpvotedPosts({
	params: { name },
}: {
	params: { name: string };
}) {
	return <Feed filter={{ votes: { some: { user: { name }, value: 1 } } }} />;
}
