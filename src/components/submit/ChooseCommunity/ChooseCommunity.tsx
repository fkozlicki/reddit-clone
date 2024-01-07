'use client';

import Avatar from '@/components/ui/Avatar/Avatar';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import useUserCommunities from '@/hooks/query/useUserCommunities';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Community } from '@prisma/client';
import Link from 'next/link';

interface ChooseCommunityProps {
	community?: Community;
}

const ChooseCommunity = ({ community }: ChooseCommunityProps) => {
	const { data, loading, error } = useUserCommunities();

	const items = loading
		? [{ text: 'Loading data' }]
		: error
		? [{ text: "Couldn't load data" }]
		: data!.user.communities.map(({ name, members }) => ({
				text: (
					<Link href={`/r/${name}/submit`}>
						<div className="flex items-center gap-3">
							<Avatar size={32} />
							<div>
								<div className="text-sm text-primary font-medium">{name}</div>
								<div className="text-xs text-primary">
									{members.length} members
								</div>
							</div>
						</div>
					</Link>
				),
		  }));

	return (
		<Dropdown items={items} className="w-full">
			<div className="flex items-center justify-between p-2 mb-2 border border-input rounded bg-primary cursor-pointer w-[275px]">
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
				<ChevronDownIcon width={16} className="text-primary" />
			</div>
		</Dropdown>
	);
};

export default ChooseCommunity;
