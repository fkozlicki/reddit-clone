import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface TabProps {
	href: string;
	selected: boolean;
	children: ReactNode;
}

const Tab = ({ href, selected, children }: TabProps) => {
	return (
		<Link
			href={href}
			className={cn(
				'flex items-center h-full px-2 uppercase text-sm font-medium hover:text-button text-primary',
				{ 'shadow-tab': selected }
			)}
		>
			{children}
		</Link>
	);
};

export default Tab;
