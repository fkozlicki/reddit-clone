import CommentsFeed from '@/components/profile/CommentsFeed/CommentsFeed';
import React from 'react';

export default async function UserComments({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;

	return <CommentsFeed userName={name} />;
}
