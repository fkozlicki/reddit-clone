import CommentsFeed from '@/components/profile/CommentsFeed/CommentsFeed';
import React from 'react';

export default function UserComments({
	params: { name },
}: {
	params: { name: string };
}) {
	return <CommentsFeed userName={name} />;
}
