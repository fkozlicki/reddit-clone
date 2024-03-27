'use client';

import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import useVote, { VoteValue } from '@/hooks/mutation/useVote';
import { PostComment } from '@/hooks/query/usePost';
import { PostPreview } from '@/hooks/query/usePosts';
import { ArrowFatDown, ArrowFatUp } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';

type VoteSectionProps = {
	direction: 'row' | 'column';
	karma: number;
	voteValue: VoteValue | null;
} & (
	| { type: 'post'; post: PostPreview }
	| { type: 'comment'; comment: PostComment }
);

const VoteSection = ({
	direction,
	karma,
	voteValue,
	...props
}: VoteSectionProps) => {
	const { data: session } = useSession();
	const [, dispatch] = useModalsContext();
	const [vote] = useVote(props.type);

	const handleVote = async (value: VoteValue) => {
		if (!session) {
			dispatch({ type: 'openSignIn' });
			return;
		}

		const variables =
			props.type === 'post'
				? { value, postId: props.post.id }
				: { value, commentId: props.comment.id };

		vote({
			variables,
			optimisticResponse: {
				...(props.type === 'post'
					? {
							votePost: {
								...props.post,
								karma:
									props.post.karma +
									(props.post.voteValue
										? props.post.voteValue === value
											? -value
											: value * 2
										: value),
								voteValue: props.post.voteValue === value ? null : value,
							},
					  }
					: {
							voteComment: {
								...props.comment,
								karma:
									props.comment.karma +
									(props.comment.voteValue
										? props.comment.voteValue === value
											? -value
											: value * 2
										: value),
								voteValue: props.comment.voteValue === value ? null : value,
							},
					  }),
			},
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
				variant="text"
				shape="square"
				size="small"
				onClick={onUpvote}
				className="group"
				icon={
					<ArrowFatUp
						size={20}
						className={`group-hover:text-red-600 ${
							voteValue === 1 ? 'text-red-600' : 'text-primary'
						}`}
					/>
				}
			/>

			<div className="text-[12px] font-semibold text-primary">{karma}</div>
			<Button
				aria-label="Down Vote"
				variant="text"
				shape="square"
				size="small"
				onClick={onDownvote}
				className="group"
				icon={
					<ArrowFatDown
						size={20}
						className={`group-hover:text-blue-600 ${
							voteValue === -1 ? 'text-blue-600' : 'text-primary'
						}`}
					/>
				}
			/>
		</div>
	);
};

export default VoteSection;
