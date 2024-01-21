'use client';

import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import useVote from '@/hooks/mutation/useVote';
import { PostVote } from '@/hooks/query/usePost';
import {
	ArrowDownCircleIcon,
	ArrowUpCircleIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

type VoteSectionProps = {
	direction: 'row' | 'column';
	karma: number;
	vote?: PostVote;
	refetch: 'Post' | 'Posts' | 'Overview';
} & ({ type: 'post'; postId: string } | { type: 'comment'; commentId: string });

const VoteSection = ({
	direction,
	karma,
	refetch,
	...props
}: VoteSectionProps) => {
	const { data: session } = useSession();
	const [, dispatch] = useModalsContext();
	const [vote] = useVote(props.type, {
		onError() {
			toast.error("Couldn't vote");
		},
		refetchQueries: [refetch],
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
