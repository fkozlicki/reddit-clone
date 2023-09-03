'use client';

import { useModalsContext } from '@/contexts/ModalsContext';
import useVote from '@/hooks/mutation/useVote';
import { PostVote } from '@/hooks/query/usePost';
import {
	ArrowDownCircleIcon,
	ArrowUpCircleIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

type VoteSectionProps = {
	direction: 'row' | 'column';
	initialKarma: number;
	initialVote?: PostVote;
} & ({ type: 'post'; postId: string } | { type: 'comment'; commentId: string });

const VoteSection = (props: VoteSectionProps) => {
	const { data: session } = useSession();
	const [, dispatch] = useModalsContext();
	const { direction, initialKarma, type, initialVote } = props;
	const [userVote, setUserVote] = useState<PostVote | undefined>(initialVote);
	const [karma, setKarma] = useState(initialKarma);
	const [vote] = useVote(type, {
		onError() {
			toast("Couldn't vote");
		},
		refetchQueries: ['bestPosts', 'hotPosts', 'topPosts', 'newPosts'],
	});

	useEffect(() => {
		setUserVote(initialVote);
	}, [initialVote]);

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	const handleVote = async (value: 1 | -1) => {
		const variables =
			type === 'post'
				? { value, postId: props.postId }
				: { value, commentId: props.commentId };

		const { data } = await vote({
			variables,
		});
		if (data) {
			if (userVote?.value === value) {
				setKarma((prev) => prev - userVote.value);
				setUserVote(undefined);
			} else {
				if ('makeVote' in data) {
					setUserVote(data.makeVote);
				} else {
					setUserVote(data.makeCommentVote);
				}
				setKarma((prev) => prev + value * (userVote ? 2 : 1));
			}
		}
	};

	return (
		<div
			className={`flex items-center gap-1 ${
				direction === 'column' ? 'flex-col' : ''
			}`}
		>
			<button
				aria-label="Up Vote"
				onClick={session ? () => handleVote(1) : openSignIn}
				className="rounded-sm hover:bg-button-hover group p-px outline-none"
			>
				<ArrowUpCircleIcon
					className={`w-6 group-hover:text-danger ${
						userVote?.value === 1 ? 'text-danger' : 'text-text-gray'
					}`}
				/>
			</button>
			<div className="text-[12px] font-semibold">{karma}</div>
			<button
				aria-label="Down Vote"
				onClick={session ? () => handleVote(-1) : openSignIn}
				className="rounded-sm hover:bg-button-hover group p-px outline-none"
			>
				<ArrowDownCircleIcon
					className={`w-6 group-hover:text-primary ${
						userVote?.value === -1 ? 'text-primary' : 'text-text-gray'
					}`}
				/>
			</button>
		</div>
	);
};

export default VoteSection;
