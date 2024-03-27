import Avatar from '@/components/ui/Avatar/Avatar';
import Link from 'next/link';
import React from 'react';

interface CommunityResultProps {
	name: string;
}

const CommunityResult = ({ name }: CommunityResultProps) => {
	return (
		<Link
			href={`/r/${name}`}
			className="flex items-center gap-2 p-2 hover:bg-btn-text text-primary"
		>
			<Avatar size={24} />
			<div>
				<div className="text-sm font-medium">{name}</div>
				<div className="text-xs">Community </div>
			</div>
		</Link>
	);
};

export default CommunityResult;
