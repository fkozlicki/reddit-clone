'use client';

import React from 'react';
import IconButton from '../buttons/IconButton/IconButton';
import {
	BarsArrowUpIcon,
	BoltIcon,
	FireIcon,
	StarIcon,
} from '@heroicons/react/24/outline';

export interface FeedFilterProps {
	highlighted: 'best' | 'hot' | 'new' | 'top';
	best?: boolean;
	prefix?: string;
}

const FeedFilter = ({ prefix, best, highlighted }: FeedFilterProps) => {
	return (
		<div className="bg-background-primary p-3 rounded border border-border-post mb-6">
			<div className="flex gap-2">
				{best && (
					<IconButton
						href={`${prefix ? `/${prefix}` : ''}/best`}
						shape="circle"
						icon={<StarIcon width={20} />}
						text="Best"
						selected={highlighted === 'best'}
					/>
				)}
				<IconButton
					href={`${prefix ? `/${prefix}` : ''}/hot`}
					shape="circle"
					icon={<FireIcon width={20} />}
					text="Hot"
					selected={highlighted === 'hot'}
				/>
				<IconButton
					href={`${prefix ? `/${prefix}` : ''}/new`}
					shape="circle"
					icon={<BoltIcon width={20} />}
					text="New"
					selected={highlighted === 'new'}
				/>
				<IconButton
					href={`${prefix ? `/${prefix}` : ''}/top`}
					shape="circle"
					icon={<BarsArrowUpIcon width={20} />}
					text="Top"
					selected={highlighted === 'top'}
				/>
			</div>
		</div>
	);
};

export default FeedFilter;
