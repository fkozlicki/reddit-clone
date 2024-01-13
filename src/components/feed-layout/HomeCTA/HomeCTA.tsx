'use client';

import { useModalsContext } from '@/contexts/ModalsContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import alienImage from '../../../../public/alien.png';
import ctaImage from '../../../../public/home-cta.png';
import Button from '@/components/ui/Button/Button';
import { useRouter } from 'next/navigation';
import CommunityModal from '../CommunityModal/CommunityModal';

const HomeCTA = () => {
	const { push } = useRouter();
	const { data: session } = useSession();
	const [, dispatch] = useModalsContext();
	const [communityModalOpen, setCommunityModalOpen] = useState(false);

	const openCommunityModal = () => {
		setCommunityModalOpen(true);
	};

	const closeCommunityModal = () => {
		setCommunityModalOpen(false);
	};

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	return (
		<div className="w-[312px] border border-post rounded bg-primary">
			<Image src={ctaImage} alt="" />
			<div className="px-3 pb-3">
				<div className="flex gap-4 -mt-3 mb-4">
					<Image src={alienImage} alt="" width={40} />
					<div className="mt-8 text-primary">Home</div>
				</div>
				<p className="px-3 text-[15px] text-primary">
					Your personal Reddit frontpage. Come here to check in with your
					favorite communities.
				</p>
				<div className="w-full h-px my-4 bg-border-input" />
				<Button
					variant="primary"
					onClick={!session ? openSignIn : () => push('/submit')}
					className="w-full"
				>
					Create Post
				</Button>
				<div className="w-full h-3" />
				<Button
					className="w-full"
					onClick={session ? openCommunityModal : openSignIn}
				>
					Create Community
				</Button>
			</div>
			<CommunityModal open={communityModalOpen} onClose={closeCommunityModal} />
		</div>
	);
};

export default HomeCTA;
