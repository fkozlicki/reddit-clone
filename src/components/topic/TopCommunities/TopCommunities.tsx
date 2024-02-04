'use client';

import CommunityMembershipButton from '@/components/community/CommunityMembershipButton/CommunityMembershipButton';
import Avatar from '@/components/ui/Avatar/Avatar';
import useCommunities from '@/hooks/query/useCommunities';
import Link from 'next/link';

interface TopCommunitiesProps {
	topicSlug: string;
}

const TopCommunities = ({ topicSlug }: TopCommunitiesProps) => {
	const { data } = useCommunities({
		variables: {
			filter: { topic: { slug: topicSlug } },
			take: 5,
			sort: 'members',
		},
	});

	return (
		<div className="bg-primary border border-post p-4">
			<div className="text-xs uppercase font-semibold text-primary mb-4">
				top communities
			</div>
			<div className="flex flex-col gap-4">
				{data?.communities.map((community) => (
					<div key={community.id} className="flex justify-between items-center">
						<div className="flex items-center gap-2">
							<Link href={`/r/${community.name}`}>
								<Avatar size={32} />
							</Link>
							<div className="flex flex-col justify-center text-primary">
								<Link
									className="text-sm hover:underline"
									href={`/r/${community.name}`}
								>
									r/{community.name}
								</Link>
								<div className="text-xs">{community.membersCount}</div>
							</div>
						</div>
						<CommunityMembershipButton community={community} />
					</div>
				))}
			</div>
		</div>
	);
};

export default TopCommunities;
