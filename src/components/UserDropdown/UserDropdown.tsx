'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import LinkButton from '../buttons/LinkButton/LinkButton';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { useClickAway } from '@/hooks/useClickAway';
import { gql, useQuery } from '@apollo/client';

interface UserDropdownProps {
	userName: string;
}

const topicsQuery = gql`
	query {
		topics {
			name
		}
	}
`;

const UserDropdown = ({ userName }: UserDropdownProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const [topicsOpen, setTopicsOpen] = useState<boolean>(false);
	const dropdown = useClickAway<HTMLDivElement>(() => setOpen(false));
	const { data } = useQuery(topicsQuery);

	const toggleDropdown = () => {
		setOpen((prev) => !prev);
	};

	const toggleTopics = () => {
		setTopicsOpen((prev) => !prev);
	};

	return (
		<div ref={dropdown} className="relative w-max">
			<button
				onClick={toggleDropdown}
				className={`px-2 py-1 flex items-center border border-transparent hover:border-border-input rounded w-[175px] justify-between ${
					open ? 'border-border-input border-b-0 rounded-b-none' : ''
				}`}
			>
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 bg-black rounded-full"></div>
					<div>
						<div className="text-xs font-semibold">{userName}</div>
						<div className="text-xs text-text-gray text-start">1 karma</div>
					</div>
				</div>
				<ChevronDownIcon width={16} className="text-text-gray" />
			</button>
			{open && (
				<div className="absolute top-full right-0 w-[250px] bg-background-primary border border-border-input border-t-0 rounded-b rounded-tl z-10 overflow-hidden">
					<div className="flex flex-col">
						<LinkButton
							href=""
							icon={<Cog6ToothIcon width={20} />}
							text="Profile"
						/>
						<LinkButton
							href=""
							icon={<Cog6ToothIcon width={20} />}
							text="User Settings"
						/>
						<LinkButton
							href=""
							icon={<Cog6ToothIcon width={20} />}
							text="Dark Mode"
						/>
						<div className="w-full">
							<LinkButton
								onClick={toggleTopics}
								icon={<Cog6ToothIcon width={20} />}
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
							icon={<Cog6ToothIcon width={20} />}
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
