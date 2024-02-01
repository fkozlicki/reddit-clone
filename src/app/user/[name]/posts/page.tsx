import Feed from '@/components/feed-layout/Feed/Feed';
import React from 'react';

export default function UserPosts({
	params: { name },
}: {
	params: { name: string };
}) {
	return <Feed sort="new" filter={{ author: { name } }} />;
}
