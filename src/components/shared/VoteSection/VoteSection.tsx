'use client';

import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import useVote, { PostVoteMutationResponse } from '@/hooks/mutation/useVote';
import { PostVote } from '@/hooks/query/usePost';
import { POSTS_QUERY, PostsQueryResponse } from '@/hooks/query/usePosts';
import {
	ArrowDownCircleIcon,
	ArrowUpCircleIcon,
} from '@heroicons/react/24/outline';
import { randomBytes } from 'crypto';
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
		onError(err) {
			console.log(err);
			toast.error("Couldn't vote");
		},
		update: (cache, result, options) => {
			if (options.variables && 'postId' in options.variables) {
				cache.updateQuery<PostsQueryResponse>(
					{
						query: POSTS_QUERY,
						variables: {
							first: 5,
							filter: {
								votes: {
									some: {
										user: { name: session?.user.name },
										value: options.variables.value,
									},
								},
							},
						},
					},
					(data) => {
						if (!data || !result.data) {
							return null;
						}

						const newPost = (result.data as PostVoteMutationResponse).votePost;

						const added = newPost.votes.some(
							(vote) => vote.userId === session?.user.id
						);

						return {
							...data,
							posts: {
								...data.posts,
								edges: added
									? [
											{
												cursor: randomBytes(32).toString('base64'),
												node: newPost,
											},
											...data.posts.edges,
									  ]
									: data.posts.edges.filter(
											(edge) => edge.node.id !== newPost.id
									  ),
							},
						};
					}
				);
			}
		},
	});

	const handleVote = async (value: 1 | -1) => {
		if (!session) {
			dispatch({ type: 'openSignIn' });
			return;
		}

		const variables =
			props.type === 'post'
				? { value, postId: props.postId }
				: { value, commentId: props.commentId };

		vote({
			variables,
		});
	};

	const onUpvote = () => {
		handleVote(1);
	};

	const onDownvote = () => {
		handleVote(-1);
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
				onClick={onUpvote}
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
				onClick={onDownvote}
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
