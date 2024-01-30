'use client';

import Post from '@/components/shared/Post/Post';
import PostSkeleton from '@/components/shared/PostSkeleton/PostSkeleton';
import usePost from '@/hooks/query/usePost';
import React from 'react';
import CommunityAbout from '../CommunityAbout/CommunityAbout';
import Comment from '../Comment/Comment';

interface CommentDetailsProps {
	postId: string;
	commentId: string;
}

const CommentDetails = ({ postId, commentId }: CommentDetailsProps) => {
	const { data, loading, error } = usePost({
		variables: {
			id: postId,
			commentsFilter: { id: commentId },
		},
	});

	if (loading) {
		return (
			<div className="flex gap-4 justify-center flex-1 min-h-full">
				<div className="w-full lg:max-w-[750px] flex flex-col">
					<PostSkeleton />
				</div>
				<div className="w-[312px] hidden lg:block flex-shrink-0">
					<CommunityAbout withName cta="Join" />
				</div>
			</div>
		);
	}

	if (error) {
		return <div>Couldn`t load data</div>;
	}

	if (!data) {
		return <div>404</div>;
	}

	const post = data.post;

	return (
		<div className="flex gap-4 justify-center flex-1 min-h-full">
			<div className="w-full lg:max-w-[750px] flex flex-col">
				<Post post={post} toggleContent />
				<div className="w-full h-5" />
				<div className="bg-primary border border-post rounded py-4">
					<Comment comment={post.comments[0]} highlight />
				</div>
			</div>
			<div className="w-[312px] hidden lg:block flex-shrink-0">
				<CommunityAbout withName cta="Join" />
			</div>
		</div>
	);
};

export default CommentDetails;
