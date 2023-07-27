'use client';

import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import Button from '../buttons/Button/Button';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { Community } from '@prisma/client';
import CommunityTopic from '../CommunityTopic/CommunityTopic';
import { formatDate } from '@/utils/formatDate';
import { useClickAway } from '@/hooks/useClickAway';
import { useSession } from 'next-auth/react';

export const CommunityQuery = gql`
	query ($name: String!) {
		community(name: $name) {
			name
			description
			createdAt
			members {
				id
			}
			moderators {
				id
			}
			topic {
				id
				name
			}
		}
	}
`;

type CommunityQueryResponse = {
	community: Community & {
		moderators: { id: string }[];
		members: { id: string }[];
		topic: {
			id: string;
			name: string;
		};
	};
};
type CommunityQueryValues = {
	name: string;
};

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
	const { data: session } = useSession();
	const params = useParams();
	const name = params.name as string;
	const [descriptionInputOpen, setDescriptionInputOpen] =
		useState<boolean>(false);
	const description = useClickAway<HTMLDivElement>(() => {
		setDescriptionInputOpen(false);
	});
	const { data, loading, error } = useQuery<
		CommunityQueryResponse,
		CommunityQueryValues
	>(CommunityQuery, {
		variables: {
			name,
		},
	});

	const openDescriptionInput = () => {
		if (!descriptionInputOpen) {
			setDescriptionInputOpen(true);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error</div>;
	}

	if (!data) {
		return <div>Couldnt load data</div>;
	}

	const isModerator = data.community.moderators.some(
		(mod) => mod.id === session?.user.id
	);
	const isMember = data.community.members.some(
		(member) => member.id === session?.user.id
	);

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
						<div>r/{data.community.name}</div>
					</div>
				)}
				{editable && isModerator ? (
					<div
						onClick={openDescriptionInput}
						className="p-2 border border-border-input mb-2 rounded hover:border-primary cursor-pointer"
					>
						{descriptionInputOpen ? (
							<div ref={description}>
								<input
									autoFocus
									type="text"
									className="w-full outline-none text-sm mb-2"
									placeholder="Tell us about your community"
								/>
								<div className="flex justify-between text-xs">
									<div className="text-text-gray">characters remaining</div>
									<div className="flex items-center gap-2">
										<div className="font-semibold text-danger">Cancel</div>
										<div className="font-semibold text-primary">Save</div>
									</div>
								</div>
							</div>
						) : (
							<div className="text-primary text-xs font-semibold">
								{data?.community.description ?? 'Add description'}
							</div>
						)}
					</div>
				) : (
					<div className="text-sm mb-2">{data?.community.description}</div>
				)}
				<div className="flex items-center gap-4">
					<CalendarDaysIcon width={20} />
					<span className="text-text-gray text-sm">
						Created {formatDate(new Date(data!.community.createdAt))}
					</span>
				</div>
				<div className="w-full h-px bg-border-input my-4" />
				<div>
					<div>{data?.community.members.length}</div>
					<div className="text-xs text-text-gray">Memebers</div>
				</div>
				<div className="w-full h-px bg-border-input my-4" />
				{editable && isModerator && (
					<>
						<CommunityTopic initialTopic={data.community.topic.name} />
						<div className="w-full h-px bg-border-input my-4" />
					</>
				)}
				{cta &&
					(cta === 'Create Post' ? (
						<Button text="Create Post" filled href={`/r/${name}/submit`} />
					) : (
						<Button text={isMember ? 'Joined' : 'Join'} filled={!isMember} />
					))}
			</div>
		</div>
	);
};

export default CommunityAbout;
