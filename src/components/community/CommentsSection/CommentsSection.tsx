'use client';

import { PostComment } from '@/hooks/query/usePost';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm';

interface CommentsSectionProps {
	comments: PostComment[];
	postId: string;
}

const CommentsSection = ({ comments, postId }: CommentsSectionProps) => {
	return (
		<div className="bg-primary py-5 px-4 flex-1 border border-post rounded">
			<div className="mx-8">
				<CommentForm postId={postId} />
			</div>
			<div className="w-full h-5" />
			{comments.length > 0 ? (
				comments.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))
			) : (
				<div className="text-center text-primary">No comments yet.</div>
			)}
		</div>
	);
};

export default CommentsSection;
