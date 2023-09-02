'use client';

import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import Button from '../buttons/Button/Button';
import { useParams } from 'next/navigation';
import CommunityTopic from '../CommunityTopic/CommunityTopic';
import { formatDate } from '@/utils/formatDate';
import { useSession } from 'next-auth/react';
import CommunityDescriptionForm from '../forms/CommunityDescriptionForm/CommunityDescriptionForm';
import CommunityMembershipButton from '../CommunityMembershipButton/CommunityMembershipButton';
import { useModalsContext } from '@/contexts/ModalsContext';
import useCommunity from '@/hooks/query/useCommunity';

interface CommunityAboutProps {
	cta?: 'Create Post' | 'Join';
	withName?: boolean;
	withHeader?: boolean;
	editable?: boolean;
}

const CommunityAbout = ({
	withHeader,
	withName,
	cta,
	editable,
}: CommunityAboutProps) => {
	const [description, setDescription] = useState<string | null>(null);
	const { data: session } = useSession();
	const [, dispatch] = useModalsContext();
	const params = useParams();
	const name = params.name as string;
	const { data, loading, error } = useCommunity({
		variables: {
			name,
		},
		onCompleted(data) {
			setDescription(data.community.description);
		},
	});

	const updateDescription = (description: string | null) => {
		setDescription(description);
	};

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error || !data) {
		return <div>Couldnt load data</div>;
	}

	const isModerator = data.community.moderators.some(
		(mod) => mod.id === session?.user.id
	);

	const { name: communityName, createdAt, members, topic } = data.community;

	return (
		<div className="rounded border border-border-post bg-background-primary relative">
			<div className="bg-blue-500 p-3 rounded-t">
				{withHeader && (
					<div className="flex justify-between items-center">
						<div className="text-sm font-bold text-white">About Community</div>
						<div className="text-[10px] font-bold uppercase text-white">
							mod tools (soon)
						</div>
					</div>
				)}
			</div>
			<div className="p-3">
				{withName && (
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-10 bg-black rounded-full"></div>
						<div>r/{communityName}</div>
					</div>
				)}
				{editable && isModerator ? (
					<CommunityDescriptionForm
						updateDescription={updateDescription}
						communityName={communityName}
						initialDescription={description}
					/>
				) : (
					<div className="text-sm mb-2">{description}</div>
				)}
				<div className="flex items-center gap-4">
					<CalendarDaysIcon width={20} />
					<span className="text-text-gray text-sm">
						Created {formatDate(new Date(createdAt))}
					</span>
				</div>
				<div className="w-full h-px bg-border-input my-4" />
				<div>
					<div>{members.length}</div>
					<div className="text-xs text-text-gray">Memebers</div>
				</div>
				<div className="w-full h-px bg-border-input my-4" />
				{editable && isModerator && (
					<>
						<CommunityTopic initialTopic={topic?.name} />
						<div className="w-full h-px bg-border-input my-4" />
					</>
				)}
				{cta &&
					(cta === 'Create Post' ? (
						<Button
							filled
							href={session ? `/r/${name}/submit` : undefined}
							onClick={!session ? openSignIn : undefined}
							classNames="w-full"
						>
							Create Post
						</Button>
					) : (
						<CommunityMembershipButton name={name} classNames="w-full" />
					))}
			</div>
		</div>
	);
};

export default CommunityAbout;
