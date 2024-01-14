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
		: data!.user.communities.map(({ name, members, image }) => ({
				text: (
					<Link href={`/r/${name}/submit`}>
						<div className="flex items-center gap-3">
							<Avatar size={32} url={image} alt="" />
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
		<div className="w-[275px]">
			<Dropdown items={items}>
				<div className="flex items-center justify-between p-2 mb-2 border border-input rounded bg-primary cursor-pointer">
					<div className="flex gap-2">
						<Avatar size={20} url={community?.image} alt="" />
						<div className="text-sm text-primary">
							{community?.name ?? 'Choose a community'}
						</div>
					</div>
					<ChevronDownIcon width={16} className="text-primary" />
				</div>
			</Dropdown>
		</div>
	);
};

export default ChooseCommunity;
