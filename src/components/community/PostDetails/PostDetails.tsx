'use client';

import React from 'react';
import CommentsSection from '../CommentsSection/CommentsSection';
import Post from '../../post/Post/Post';
import usePost from '@/hooks/query/usePost';
import CommunityAbout from '../CommunityAbout/CommunityAbout';
import PostSkeleton from '@/components/post/PostSkeleton/PostSkeleton';

interface PostDetailsProps {
	id: string;
}

const PostDetails = ({ id }: PostDetailsProps) => {
	const { data, loading, error } = usePost({
		variables: {
			id,
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

	if (!data || error) {
		return <div>Couldn`t load data</div>;
	}

	const post = data.post;

	return (
		<div className="flex gap-4 justify-center flex-1 min-h-full">
			<div className="w-full lg:max-w-[750px] flex flex-col">
				<Post
					id={post.id}
					title={post.title}
					authorName={post.author.name}
					communityName={post.community.name}
					createdAt={post.createdAt}
					content={post.content}
					commentsCount={post.comments.length}
					votes={post.votes}
				/>
				<div className="w-full h-5" />
				<CommentsSection postId={post.id} initialComments={post.comments} />
			</div>
			<div className="w-[312px] hidden lg:block flex-shrink-0">
				<CommunityAbout withName cta="Join" />
			</div>
		</div>
	);
};

export default PostDetails;
