'use client';

import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { Community } from '@prisma/client';
import { useClickAway } from '@/hooks/useClickAway';

export const UserQuery = gql`
	query {
		user {
			communities {
				id
				name
				members {
					id
				}
			}
		}
	}
`;

type UserQueryResponse = {
	user: {
		communities: {
			id: string;
			name: string;
			members: [];
		}[];
	};
};

interface ChooseCommunityProps {
	community?: Community;
}

const ChooseCommunity = ({ community }: ChooseCommunityProps) => {
	const { push } = useRouter();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { data, loading, error } = useQuery<UserQueryResponse>(UserQuery);
	const dropdown = useClickAway<HTMLDivElement>(() => {
		setDropdownOpen(false);
	});

	const toggleDropdown = () => {
		setDropdownOpen((prev) => !prev);
	};

	return (
		<div
			ref={dropdown}
			className="relative w-[275px] bg-background-primary rounded"
		>
			<div
				onClick={toggleDropdown}
				className="flex items-center justify-between p-2 mb-2"
			>
				<div className="flex gap-2">
					<div className="w-5 h-5 bg-black rounded-full"></div>
					<div className="text-sm">
						{community?.name ?? 'Choose a community'}
					</div>
				</div>
				<ChevronDownIcon width={16} />
			</div>
			{dropdownOpen && (
				<div className="absolute top-full left-0 bg-background-primary w-full p-2 shadow">
					{loading && <div>Loading communities...</div>}
					{error && <div>Could not load communities</div>}
					{data && (
						<>
							<div className="text-[10px] font-bold uppercase text-text-gray mb-2">
								Your communities
							</div>
							{data.user.communities.map(({ id, name, members }) => (
								<div
									onClick={() => push(`/r/${name}/submit`)}
									key={id}
									className="flex gap-2 cursor-pointer"
								>
									<div className="w-8 h-8 bg-black rounded-full items-center"></div>
									<div>
										<div className="text-sm">{name}</div>
										<div className="text-xs text-text-gray">
											{members.length} members
										</div>
									</div>
								</div>
							))}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default ChooseCommunity;
