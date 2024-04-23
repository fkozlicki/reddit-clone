'use client';

import Avatar from '@/components/ui/Avatar/Avatar';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import useTopics from '@/hooks/query/useTopics';
import {
	Binoculars,
	CaretDown,
	GearSix,
	Moon,
	SignOut,
	Sun,
	User,
} from '@phosphor-icons/react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

interface UserDropdownProps {
	session: Session;
}

const UserDropdown = ({ session }: UserDropdownProps) => {
	const { theme, setTheme } = useTheme();
	const { data } = useTopics();

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<Dropdown
			className="min-w-[200px]"
			items={[
				{
					text: (
						<Link
							className="flex gap-3 items-center"
							href={`/user/${session.user.name}`}
						>
							<User size={20} />
							<span>Profile</span>
						</Link>
					),
				},
				{
					text: 'Explore',
					icon: <Binoculars size={20} />,
					items:
						data &&
						data.topics.map(({ name, slug, id }) => ({
							text: (
								<Link key={id} href={`/t/${slug}`}>
									{name}
								</Link>
							),
						})),
				},
				{
					text: (
						<Link className="flex gap-3 items-center" href="/settings">
							<GearSix size={20} />
							<span>Settings</span>
						</Link>
					),
				},
				{
					text: theme === 'light' ? 'Dark Mode' : 'Light Mode',
					icon: theme === 'light' ? <Moon size={20} /> : <Sun size={20} />,
					onClick: toggleTheme,
				},
				{
					text: 'Log out',
					icon: <SignOut size={20} />,
					onClick: signOut,
				},
			]}
		>
			<div className="flex gap-4 p-1 rounded hover:bg-btn-text cursor-pointer items-center">
				<div className="flex items-center gap-2">
					<Avatar url={session.user.image} alt="avatar" size={32} />
					<div className="flex flex-col items-start">
						<div className="text-xs font-semibold max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-primary">
							{session.user.name}
						</div>
						<div className="text-xs text-start text-primary">1 karma</div>
					</div>
				</div>
				<CaretDown size={18} className="text-primary" />
			</div>
		</Dropdown>
	);
};

export default UserDropdown;
