'use client';

import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import useCommunity from '@/hooks/query/useCommunity';
import { formatDate } from '@/utils/formatDate';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import CommunityMembershipButton from '@/components/community/CommunityMembershipButton/CommunityMembershipButton';
import CommunityTopic from '@/components/community/CommunityTopic/CommunityTopic';
import Avatar from '@/components/ui/Avatar/Avatar';
import Link from 'next/link';
import CommunityDescriptionForm from '../CommunityDescriptionForm/CommunityDescriptionForm';
import CommunitySettingsModal from '../CommunitySettingsModal/CommunitySettingsModal';
import { CalendarBlank } from '@phosphor-icons/react';

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
	const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
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

	const closeSettings = () => {
		setSettingsOpen(false);
	};

	const openSettings = () => {
		setSettingsOpen(true);
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
		id,
		name: communityName,
		createdAt,
		topic,
		description,
		image,
		membersCount,
	} = data.community;

	return (
		<div className="rounded border border-post bg-primary relative">
			<div className="bg-[#0079d3] p-3 rounded-t">
				{withHeader && (
					<div className="flex justify-between items-center">
						<div className="text-sm font-bold text-white">About Community</div>
						{isModerator && (
							<>
								<CommunitySettingsModal
									community={data.community}
									open={settingsOpen}
									onClose={closeSettings}
								/>
								<Button
									onClick={openSettings}
									variant="text"
									size="small"
									className="text-white hover:bg-[#006dd3]"
									shape="square"
								>
									Mod tools
								</Button>
							</>
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
						<Avatar size={40} url={image} alt="" />
						<span className="text-primary group-hover:underline">
							r/{communityName}
						</span>
					</Link>
				)}
				{editable && isModerator ? (
					<CommunityDescriptionForm id={id} description={description} />
				) : (
					<div className="text-sm text-primary mb-4">{description}</div>
				)}
				<div className="flex items-center gap-4 text-primary">
					<CalendarBlank size={20} />
					<span className="text-sm">
						Created {formatDate(new Date(createdAt))}
					</span>
				</div>
				<div className="w-full h-px border-b border-input my-4" />
				<div className="text-primary">
					<div>{membersCount}</div>
					<div className="text-xs">Memebers</div>
				</div>
				{editable && isModerator && (
					<>
						<div className="w-full h-px border-b border-input my-4" />
						<CommunityTopic communityId={id} initialTopic={topic?.name} />
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
								community={data.community}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default CommunityAbout;
