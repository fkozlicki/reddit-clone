'use client';

import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import { useParams, useRouter } from 'next/navigation';
import { formatDate } from '@/utils/formatDate';
import { useSession } from 'next-auth/react';
import { useModalsContext } from '@/contexts/ModalsContext';
import useCommunity from '@/hooks/query/useCommunity';

import CommunityTopic from '@/components/community/CommunityTopic/CommunityTopic';
import CommunityMembershipButton from '@/components/community/CommunityMembershipButton/CommunityMembershipButton';
import CommunityDescriptionForm from '../CommunityDescriptionForm/CommunityDescriptionForm';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar/Avatar';

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
	const { push } = useRouter();
	const { data: session } = useSession();
	const [, dispatch] = useModalsContext();
	const params = useParams();
	const name = params.name as string;
	const { data, loading, error } = useCommunity({
		variables: {
			name,
		},
	});

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

	const {
		name: communityName,
		createdAt,
		members,
		topic,
		description,
	} = data.community;

	return (
		<div className="rounded border border-post bg-primary relative">
			<div className="bg-[#0079d3] p-3 rounded-t">
				{withHeader && (
					<div className="flex justify-between items-center">
						<div className="text-sm font-bold text-white">About Community</div>
						{isModerator && (
							<Button
								variant="secondary"
								size="small"
								className="text-white hover:bg-[#006dd3]"
								shape="square"
							>
								Mod tools
							</Button>
						)}
					</div>
				)}
			</div>
			<div className="p-3">
				{withName && (
					<Link
						href={`/r/${communityName}`}
						className="flex items-center gap-3 mb-4 group"
					>
						<Avatar size={40} />
						<span className="text-primary group-hover:underline">
							r/{communityName}
						</span>
					</Link>
				)}
				{editable && isModerator ? (
					<CommunityDescriptionForm
						communityName={communityName}
						description={description}
					/>
				) : (
					<div className="text-sm mb-2 text-primary">{description}</div>
				)}
				<div className="flex items-center gap-4 text-primary">
					<CalendarDaysIcon width={20} />
					<span className="text-sm">
						Created {formatDate(new Date(createdAt))}
					</span>
				</div>
				<div className="w-full h-px border-b border-input my-4" />
				<div className="text-primary">
					<div>{members.length}</div>
					<div className="text-xs">Memebers</div>
				</div>
				{editable && isModerator && (
					<>
						<div className="w-full h-px border-b border-input my-4" />
						<CommunityTopic initialTopic={topic?.name} />
					</>
				)}
				{cta && (
					<>
						<div className="w-full h-px border-b border-input my-4" />
						{cta === 'Create Post' ? (
							<Button
								variant="primary"
								onClick={
									!session ? openSignIn : () => push(`/r/${name}/submit`)
								}
								className="w-full"
							>
								Create Post
							</Button>
						) : (
							<CommunityMembershipButton
								className="w-full"
								members={members}
								communityName={name}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default CommunityAbout;
