'use client';

import Logo from '@/components/layout/Logo/Logo';
import Button from '@/components/ui/Button/Button';
import { useChatContext } from '@/contexts/ChatContext';
import { useModalsContext } from '@/contexts/ModalsContext';
import { ChatCircle } from '@phosphor-icons/react';
import { Session } from 'next-auth';
import dynamic from 'next/dynamic';
import Search from '../Search/Search';

const AuthModal = dynamic(() => import('../AuthModal/AuthModal'));
const UserDropdown = dynamic(() => import('../UserDropdown/UserDropdown'));

interface NavbarProps {
	session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
	const [{ signIn }, dispatch] = useModalsContext();
	const [, dispatchChat] = useChatContext();

	const openModal = () => {
		dispatch({ type: 'openSignIn' });
	};

	const closeModal = () => {
		dispatch({ type: 'closeSignIn' });
	};

	const openChat = () => {
		dispatchChat({ type: 'setOpen', payload: true });
	};

	return (
		<div className="fixed w-full top-0 z-20">
			<div className="flex justify-between items-center px-4 h-12 border-b border-input bg-primary z-50">
				<Logo />
				<div className="w-2 h-full" />
				<Search />
				<div className="w-2 h-full" />
				{!session && (
					<Button onClick={openModal} variant="primary" className="w-[120px]">
						Log in
					</Button>
				)}
				{session && (
					<div className="flex items-center gap-4">
						<Button onClick={openChat} icon={<ChatCircle size={20} />} />
						<UserDropdown session={session} />
					</div>
				)}
				<AuthModal open={!session && signIn} onClose={closeModal} />
			</div>
		</div>
	);
};

export default Navbar;
