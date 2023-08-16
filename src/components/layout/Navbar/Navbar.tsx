'use client';

import React from 'react';
import Image from 'next/image';
import Button from '../../buttons/Button/Button';
import Search from '../../inputs/Search/Search';
import { useSession } from 'next-auth/react';
import SignInForm from '../../forms/SignInForm/SignInForm';
import UserDropdown from '../UserDropdown/UserDropdown';
import Link from 'next/link';
import { useModalsContext } from '@/contexts/ModalsContext';

const Navbar = () => {
	const { data: session } = useSession();
	const [{ signIn }, dispatch] = useModalsContext();

	const openModal = () => {
		dispatch({ type: 'openSignIn' });
	};

	const closeModal = () => {
		dispatch({ type: 'closeSignIn' });
	};

	return (
		<div className="flex justify-between items-center px-4 h-12 border-b border-b-border-input bg-background-primary z-50">
			<Link href="/" className="inline-flex items-center justify-start gap-2">
				<Image src="/logo-icon.svg" alt="reddit logo" width={32} height={32} />
				<Image src="/logo-sign.svg" alt="reddit logo" width={57} height={18} />
			</Link>
			<div className="w-2 h-full" />
			<div className="flex-1 max-w-[690px]">
				<Search />
			</div>
			<div className="w-2 h-full" />
			{!session && (
				<Button
					onClick={openModal}
					classNames="w-[120px]"
					color="orange"
					filled
				>
					Log in
				</Button>
			)}
			{session && <UserDropdown userName={session.user.name} />}
			{!session && signIn && (
				<div className="absolute w-screen h-screen bg-black/50 top-0 left-0 flex items-center justify-center z-50">
					<SignInForm closeModal={closeModal} />
				</div>
			)}
		</div>
	);
};

export default Navbar;
