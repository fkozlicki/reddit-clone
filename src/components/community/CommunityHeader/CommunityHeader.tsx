'use client';

import CommunityMembershipButton from '@/components/community/CommunityMembershipButton/CommunityMembershipButton';
import useCommunity from '@/hooks/query/useCommunity';
import Image from 'next/image';
import React from 'react';

interface CommunityHeaderProps {
	name: string;
}

const CommunityHeader = ({ name }: CommunityHeaderProps) => {
	const { data } = useCommunity({
		variables: {
			name,
		},
	});

	return (
		<div className="bg-primary">
			<div className="h-16 bg-[#0079d3]"></div>
			<div className="max-w-[976px] m-auto">
				{data && (
					<div className="flex gap-5 items-start">
						<div className="-mt-4 bg-white overflow-hidden p-1 rounded-full">
							<Image
								src={data.community.image ?? '/community.svg'}
								alt=""
								width={64}
								height={64}
								className="rounded-full"
							/>
						</div>
						<div className="flex items-start gap-8 my-2">
							<div className="">
								<div className="text-2xl font-bold text-primary">{name}</div>
								<div className="text-sm text-primary">r/{name}</div>
							</div>
							<CommunityMembershipButton community={data.community} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommunityHeader;
