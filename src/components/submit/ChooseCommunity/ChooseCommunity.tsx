'use client';

import Avatar from '@/components/ui/Avatar/Avatar';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import useCommunities from '@/hooks/query/useCommunities';
import { CaretDown } from '@phosphor-icons/react';
import { Community } from '@prisma/client';
import Link from 'next/link';

interface ChooseCommunityProps {
	userName: string;
	community?: Community;
}

const ChooseCommunity = ({ community, userName }: ChooseCommunityProps) => {
	const { data, loading, error } = useCommunities({
		variables: {
			filter: { members: { some: { name: userName } } },
		},
	});

	const items = loading
		? [{ text: 'Loading data' }]
		: error
		? [{ text: "Couldn't load data" }]
		: [
				...data!.communities
					.filter((com) => com.id !== community?.id)
					.map(({ name, membersCount, image }) => ({
						text: (
							<Link href={`/r/${name}/submit`}>
								<div className="flex items-center gap-3">
									<Avatar size={32} url={image} alt="" />
									<div>
										<div className="text-sm text-primary font-medium">
											{name}
										</div>
										<div className="text-xs text-primary">
											{membersCount} members
										</div>
									</div>
								</div>
							</Link>
						),
					})),
				{
					text:
						data!.communities.length > 0
							? 'No more communities'
							: 'No communities to choose',
				},
		  ];

	return (
		<div className="w-[275px]">
			<Dropdown
				items={items}
				className="max-h-[350px] overflow-auto mobile-scrollbar mobile-scrollbar-vertical"
			>
				<div className="flex items-center justify-between p-2 mb-2 border border-input rounded bg-primary cursor-pointer">
					<div className="flex gap-2">
						<Avatar size={20} url={community?.image} alt="" />
						<div className="text-sm text-primary">
							{community?.name ?? 'Choose a community'}
						</div>
					</div>
					<CaretDown size={18} className="text-primary" />
				</div>
			</Dropdown>
		</div>
	);
};

export default ChooseCommunity;
