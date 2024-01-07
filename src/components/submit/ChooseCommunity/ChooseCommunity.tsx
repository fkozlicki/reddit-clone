'use client';

import useUserCommunities from '@/hooks/query/useUserCommunities';
import { useClickAway } from '@/hooks/useClickAway';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Community } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ChooseCommunityProps {
	community?: Community;
}

const ChooseCommunity = ({ community }: ChooseCommunityProps) => {
	const { push } = useRouter();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { data, loading, error } = useUserCommunities();
	const dropdown = useClickAway<HTMLDivElement>(() => {
		setDropdownOpen(false);
	});

	const toggleDropdown = () => {
		setDropdownOpen((prev) => !prev);
	};

	return (
		<div ref={dropdown} className="relative w-[275px] bg-primary rounded">
			<div
				onClick={toggleDropdown}
				className="flex items-center justify-between p-2 mb-2 border border-input rounded"
			>
				<div className="flex gap-2">
					{community ? (
						<div className="w-5 h-5 bg-black rounded-full" />
					) : (
						<div className="w-5 h-5 border post-hover border-dashed rounded-full" />
					)}
					<div className="text-sm text-primary">
						{community?.name ?? 'Choose a community'}
					</div>
				</div>
				<ChevronDownIcon width={16} className="text-primary cursor-pointer" />
			</div>
			{dropdownOpen && (
				<div className="absolute top-full left-0 bg-primary w-full p-2 drop-shadow-md">
					{data && (
						<>
							<div className="text-[10px] font-bold uppercase text-primary mb-2">
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
										<div className="text-sm text-primary">{name}</div>
										<div className="text-xs text-primary">
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
