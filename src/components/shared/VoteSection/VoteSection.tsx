'use client';

import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import useVote, {
	CommentVoteMutationResponse,
	PostVoteMutationResponse,
} from '@/hooks/mutation/useVote';
import { OverviewQueryResponse } from '@/hooks/query/useOverview';
import { PostComment, PostVote } from '@/hooks/query/usePost';
import { PostsQueryResponse } from '@/hooks/query/usePosts';
import {
	ArrowDownCircleIcon,
	ArrowUpCircleIcon,
} from '@heroicons/react/24/outline';
import { CommentVote } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

type VoteSectionProps = {
	direction: 'row' | 'column';
	karma: number;
	vote?: PostVote;
} & ({ type: 'post'; postId: string } | { type: 'comment'; commentId: string });

const VoteSection = ({ direction, karma, ...props }: VoteSectionProps) => {
	const { data: session } = useSession();
	const [, dispatch] = useModalsContext();
	const [vote] = useVote(props.type, {
		onError() {
			toast.error("Couldn't vote");
		},
		updateQueries:
			props.type === 'post'
				? {
						Post: (previousData, { mutationResult }) => {
							return {
								...previousData,
								post: {
									...previousData.post,
									votes: (mutationResult.data as PostVoteMutationResponse)
										.makeVote,
								},
							};
						},
						Posts: (previousData, { mutationResult }) => {
							return {
								...previousData,
								posts: {
									...previousData.posts,
									edges: (previousData as PostsQueryResponse).posts.edges.map(
										(edge) =>
											edge.node.id === props.postId
												? {
														...edge,
														node: {
															...edge.node,
															votes: (
																mutationResult.data as PostVoteMutationResponse
															).makeVote,
														},
												  }
												: edge
									),
								},
							};
						},
						Overview: (previousData, { mutationResult }) => {
							return {
								...previousData,
								overview: {
									...previousData.overview,
									edges: (
										previousData as OverviewQueryResponse
									).overview.edges.map((edge) =>
										edge.node.id === props.postId
											? {
													...edge,
													node: {
														...edge.node,
														votes: (
															mutationResult.data as PostVoteMutationResponse
														).makeVote,
													},
											  }
											: edge
									),
								},
							};
						},
				  }
				: {
						Post: (previousData, { mutationResult }) => {
							function updateComments(
								comments: PostComment[],
								targetId: string,
								votes: CommentVote[]
							): PostComment[] {
								return comments.map((comment) => {
									if (comment.id === targetId) {
										return { ...comment, votes };
									}

									if (comment.replies && comment.replies.length > 0) {
										return {
											...comment,
											replies: updateComments(comment.replies, targetId, votes),
										};
									}

									return comment;
								});
							}

							const newComments = updateComments(
								previousData.post.comments,
								props.commentId,
								(mutationResult.data as CommentVoteMutationResponse)
									.makeCommentVote
							);

							return {
								...previousData,
								post: {
									...previousData.post,
									comments: newComments,
								},
							};
						},
				  },
	});

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	const handleVote = async (value: 1 | -1) => {
		const variables =
			props.type === 'post'
				? { value, postId: props.postId }
				: { value, commentId: props.commentId };

		vote({
			variables,
		});
	};

	return (
		<div
			className={`flex items-center gap-1 ${
				direction === 'column' ? 'flex-col' : ''
			}`}
		>
			<Button
				aria-label="Up Vote"
				variant="secondary"
				shape="square"
				size="small"
				onClick={session ? () => handleVote(1) : openSignIn}
				className="group"
				icon={
					<ArrowUpCircleIcon
						className={`w-6 group-hover:text-red-600 ${
							props.vote?.value === 1 ? 'text-red-600' : 'text-primary'
						}`}
					/>
				}
			/>

			<div className="text-[12px] font-semibold text-primary">{karma}</div>
			<Button
				aria-label="Down Vote"
				variant="secondary"
				shape="square"
				size="small"
				onClick={session ? () => handleVote(-1) : openSignIn}
				className="group"
				icon={
					<ArrowDownCircleIcon
						className={`w-6 group-hover:text-blue-600 ${
							props.vote?.value === -1 ? 'text-blue-600' : 'text-primary'
						}`}
					/>
				}
			/>
		</div>
	);
};

export default VoteSection;
