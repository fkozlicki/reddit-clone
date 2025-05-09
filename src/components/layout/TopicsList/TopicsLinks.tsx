'use client';

import Button from '@/components/ui/Button/Button';
import useTopics from '@/hooks/query/useTopics';
import { Star } from '@phosphor-icons/react';
import Link from 'next/link';

export default function TopicsLinks() {
	const { data } = useTopics();

	return (
		<div className="max-h-[336px] overflow-auto mobile-scrollbar mobile-scrollbar-vertical">
			{data?.topics.map(({ slug, name }, index) => (
				<Link key={index} href={`/t/${slug}`}>
					<Button
						className="w-full rounded-none justify-start"
						variant="text"
						icon={<Star weight="fill" size={20} />}
					>
						{name}
					</Button>
				</Link>
			))}
		</div>
	);
}
