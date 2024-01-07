'use client';

import Logo from '@/components/layout/Logo/Logo';
import Avatar from '@/components/ui/Avatar/Avatar';
import Button from '@/components/ui/Button/Button';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import TextField from '@/components/ui/TextField/TextField';
import { useModalsContext } from '@/contexts/ModalsContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import {
	ArrowRightOnRectangleIcon,
	ChevronDownIcon,
	Cog6ToothIcon,
	MoonIcon,
	SunIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import AuthModal from '../AuthModal/AuthModal';

interface NavbarProps {
	session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
	const [{ signIn }, dispatch] = useModalsContext();
	const { theme, changeTheme } = useThemeContext();

	const openModal = () => {
		dispatch({ type: 'openSignIn' });
	};

	const closeModal = () => {
		dispatch({ type: 'closeSignIn' });
	};

	const toggleTheme = () => {
		changeTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<div className="flex justify-between items-center px-4 h-12 border-b border-input bg-primary z-50">
			<Logo />
			<div className="w-2 h-full" />
			<div className="flex-1 max-w-[690px]">
				<TextField
					className="w-full rounded-3xl hover:border-button focus:border-button"
					placeholder="Search Reddit"
				/>
			</div>
			<div className="w-2 h-full" />
			{!session && (
				<Button onClick={openModal} variant="primary" className="w-[120px]">
					Log in
				</Button>
			)}
			{session && (
				<Dropdown
					className="min-w-[200px]"
					items={[
						{
							text: (
								<Link
									className="flex gap-3 items-center"
									href={`/user/${session.user.name}`}
								>
									<UserIcon width={20} />
									<span>Profile</span>
								</Link>
							),
						},
						{
							text: (
								<Link className="flex gap-3 items-center" href="/settings">
									<Cog6ToothIcon width={20} />
									<span>Settings</span>
								</Link>
							),
						},
						{
							text: theme === 'light' ? 'Dark Mode' : 'Light Mode',
							icon:
								theme === 'light' ? (
									<MoonIcon width={20} />
								) : (
									<SunIcon width={20} />
								),
							onClick: toggleTheme,
						},
						{
							text: 'Log out',
							icon: <ArrowRightOnRectangleIcon width={20} />,
							onClick: signOut,
						},
					]}
				>
					<div className="flex gap-4 p-1 rounded hover:bg-slate-200 cursor-pointer">
						<div className="flex items-center gap-2">
							<Avatar url={session.user.image} alt="avatar" size={32} />
							<div className="flex flex-col items-start">
								<div className="text-xs font-semibold max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-primary">
									{session.user.name}
								</div>
								<div className="text-xs text-start text-primary">1 karma</div>
							</div>
						</div>
						<ChevronDownIcon width={16} className="text-primary" />
					</div>
				</Dropdown>
			)}
			<AuthModal open={!session && signIn} onClose={closeModal} />
		</div>
	);
};

export default Navbar;
