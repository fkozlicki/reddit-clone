'use client';

import Logo from '@/components/layout/Logo/Logo';
import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import { Session } from 'next-auth';
import AuthModal from '../AuthModal/AuthModal';
import Search from '../Search/Search';
import UserDropdown from '../UserDropdown/UserDropdown';

interface NavbarProps {
	session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
	const [{ signIn }, dispatch] = useModalsContext();

	const openModal = () => {
		dispatch({ type: 'openSignIn' });
	};

	const closeModal = () => {
		dispatch({ type: 'closeSignIn' });
	};

	return (
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
			{session && <UserDropdown session={session} />}
			{!session && <AuthModal open={signIn} onClose={closeModal} />}
		</div>
	);
};

export default Navbar;
