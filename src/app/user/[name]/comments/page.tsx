import CommentsFeed from '@/components/profile/CommentsFeed/CommentsFeed';
import React from 'react';

const page = ({ params: { name } }: { params: { name: string } }) => {
	return <CommentsFeed userName={name} />;
};

export default page;
