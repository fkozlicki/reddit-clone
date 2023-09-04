'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import LinkButton from '../../buttons/LinkButton/LinkButton';
import {
	ArrowRightOnRectangleIcon,
	Cog6ToothIcon,
	MoonIcon,
	RocketLaunchIcon,
	SunIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { useClickAway } from '@/hooks/useClickAway';
import useTopics from '@/hooks/query/useTopics';
import { User } from '@prisma/client';
import Image from 'next/image';
import { useThemeContext } from '@/contexts/ThemeContext';

interface UserDropdownProps {
	userName: User['name'];
	image?: string | null;
}

const UserDropdown = ({ userName, image }: UserDropdownProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const [topicsOpen, setTopicsOpen] = useState<boolean>(false);
	const dropdown = useClickAway<HTMLDivElement>(() => setOpen(false));
	const { data } = useTopics();
	const { theme, changeTheme } = useThemeContext();

	const toggleDropdown = () => {
		setOpen((prev) => !prev);
	};

	const toggleTopics = () => {
		setTopicsOpen((prev) => !prev);
	};

	const toggleTheme = () => {
		changeTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<div ref={dropdown} className="relative w-max">
			<button
				aria-label="User Dropdown"
				onClick={toggleDropdown}
				className={`bg-primary px-2 py-1 flex items-center border hover:border-input rounded w-[175px] justify-between ${
					open ? 'border-input border-b-0 rounded-b-none' : 'border-transparent'
				}`}
			>
				<div className="flex items-center gap-2">
					{image ? (
						<Image
							src={image}
							alt="profile image"
							width={32}
							height={32}
							className="rounded-full"
						/>
					) : (
						<div className="w-6 h-6 bg-black rounded-full"></div>
					)}
					<div className="flex flex-col items-start">
						<div className="text-xs font-semibold max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-primary">
							{userName}
						</div>
						<div className="text-xs text-primary text-start text-primary">
							1 karma
						</div>
					</div>
				</div>
				<ChevronDownIcon width={16} className="text-primary" />
			</button>
			{open && (
				<div className="absolute top-full right-0 w-[250px] bg-primary border border-input border-t-0 rounded-b rounded-tl z-10 overflow-hidden py-2">
					<div className="flex flex-col">
						<LinkButton
							href={`/user/${userName}`}
							icon={<UserIcon width={20} className="text-primary" />}
							text="Profile"
						/>
						<LinkButton
							href="/settings"
							icon={<Cog6ToothIcon width={20} className="text-primary" />}
							text="User Settings"
						/>
						<LinkButton
							onClick={toggleTheme}
							icon={
								theme === 'light' ? (
									<MoonIcon width={20} className="text-primary" />
								) : (
									<SunIcon width={20} className="text-primary" />
								)
							}
							text={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
						/>
						<div className="w-full">
							<LinkButton
								onClick={toggleTopics}
								icon={<RocketLaunchIcon width={20} className="text-primary" />}
								text="Explore"
							/>
							{topicsOpen && data && (
								<div>
									{data.topics.map((topic, index) => (
										<LinkButton
											text={topic.name}
											href={`/t/${topic.name}`}
											key={index}
										/>
									))}
								</div>
							)}
						</div>
						<LinkButton
							href=""
							icon={
								<ArrowRightOnRectangleIcon
									width={20}
									className="text-primary"
								/>
							}
							text="Log out"
							onClick={() => signOut()}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserDropdown;
