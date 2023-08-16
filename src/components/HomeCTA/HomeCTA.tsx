'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import ctaImage from '../../../public/home-cta.png';
import alienImage from '../../../public/alien.png';
import Button from '../buttons/Button/Button';
import CreateCommunityForm from '../forms/CommunityForm/CommunityForm';
import { useSession } from 'next-auth/react';
import { useModalsContext } from '@/contexts/ModalsContext';

const HomeCTA = () => {
	const { data: session } = useSession();
	const [, dispatch] = useModalsContext();
	const [createCommunityModalOpen, setCreateCommunityModalOpen] =
		useState(false);

	const openCreateCommunityModal = () => {
		setCreateCommunityModalOpen(true);
	};

	const closeCreateCommunityModal = () => {
		setCreateCommunityModalOpen(false);
	};

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	return (
		<>
			<div className="w-[312px] border border-border-post rounded bg-background-primary">
				<Image src={ctaImage} alt="" />
				<div className="px-3 pb-3">
					<div className="flex gap-4 -mt-3 mb-4">
						<Image src={alienImage} alt="" width={40} />
						<div className="mt-8">Home</div>
					</div>
					<p className="px-3 text-[15px]">
						Your personal Reddit frontpage. Come here to check in with your
						favorite communities.
					</p>
					<div className="w-full h-px my-4 bg-border-input" />
					<Button
						filled
						href={session ? '/submit' : undefined}
						onClick={!session ? openSignIn : undefined}
						classNames="w-full"
					>
						Create Post
					</Button>
					<div className="w-full h-3" />
					<Button
						classNames="w-full"
						onClick={session ? openCreateCommunityModal : openSignIn}
					>
						Create Community
					</Button>
				</div>
			</div>
			{createCommunityModalOpen && (
				<div className="fixed h-screen w-screen bg-black/50 flex justify-center items-center top-0 left-0 z-0">
					<CreateCommunityForm closeModal={closeCreateCommunityModal} />
				</div>
			)}
		</>
	);
};

export default HomeCTA;
