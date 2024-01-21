'use client';

import Avatar from '@/components/ui/Avatar/Avatar';
import Button from '@/components/ui/Button/Button';
import useCommunities from '@/hooks/query/useCommunities';
import Link from 'next/link';
import React from 'react';

interface TopCommunitiesProps {
	topicName: string;
}

const TopCommunities = ({ topicName }: TopCommunitiesProps) => {
	const { data } = useCommunities({
		variables: {
			filter: { topic: { name: topicName } },
			take: 5,
			sort: 'members',
		},
	});

	return (
		<div className="bg-primary border border-post p-4">
			<div className="text-xs uppercase font-semibold text-gray-700 mb-4">
				Communities
			</div>
			<div className="flex flex-col gap-1">
				{data?.communities.map((community) => (
					<div key={community.id} className="flex justify-between items-center">
						<div className="flex items-center gap-2">
							<Link href={`/r/${community.name}`}>
								<Avatar size={32} />
							</Link>
							<div className="">
								<Link
									className="text-sm hover:underline"
									href={`/r/${community.name}`}
								>
									r/{community.name}
								</Link>
								<div className="text-xs">{community.membersCount}</div>
							</div>
						</div>
						<Button variant="secondary">Join</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export default TopCommunities;
