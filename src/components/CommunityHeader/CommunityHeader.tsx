import Image from 'next/image';
import React from 'react';
import CommunityMembershipButton from '../CommunityMembershipButton/CommunityMembershipButton';

interface CommunityHeaderProps {
	name: string;
}

const CommunityHeader = ({ name }: CommunityHeaderProps) => {
	return (
		<div className="bg-background-primary">
			<div className="h-16 bg-blue-400"></div>
			<div className="max-w-[976px] m-auto">
				<div className="flex gap-5 items-start">
					<div className="p-1 rounded-full -mt-4 bg-background-primary">
						<Image src="/community.svg" alt="" width={64} height={64} />
					</div>
					<div className="flex items-start gap-8 my-2">
						<div className="">
							<div className="text-2xl font-bold">{name}</div>
							<div className="text-sm text-text-gray">r/{name}</div>
						</div>
						<CommunityMembershipButton name={name} classNames="w-24" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommunityHeader;
