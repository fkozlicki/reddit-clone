import Link from 'next/link';
import React from 'react';

interface PostResultProps {
	communityName: string;
	title: string;
	postId: string;
}

const PostResult = ({ communityName, postId, title }: PostResultProps) => {
	return (
		<Link
			href={`/r/${communityName}/comments/${postId}`}
			className="p-2 hover:bg-btn-text text-primary"
		>
			<div className="text-xs font-medium">r/{communityName}</div>
			<div>{title}</div>
		</Link>
	);
};

export default PostResult;
