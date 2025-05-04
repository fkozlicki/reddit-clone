'use client';

import PostSkeleton from '@/components/shared/PostSkeleton/PostSkeleton';
import usePost from '@/hooks/query/usePost';
import Post from '../../shared/Post/Post';
import CommentsSection from '../CommentsSection/CommentsSection';
import CommunityAbout from '../CommunityAbout/CommunityAbout';

interface PostDetailsProps {
	id: string;
}

const PostDetails = ({ id }: PostDetailsProps) => {
	const { data, loading, error } = usePost({
		variables: {
			id,
			commentsFilter: { replyToId: null },
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
				<Post post={post} />
				<div className="w-full h-5" />
				<CommentsSection postId={post.id} comments={post.comments} />
			</div>
			<div className="w-[312px] hidden lg:block flex-shrink-0">
				<CommunityAbout withName cta="Join" />
			</div>
		</div>
	);
};

export default PostDetails;
