import { COMMUNITY_QUERY } from '@/hooks/query/useCommunity';
import { PreloadQuery } from '@/lib/apollo';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export interface CommunityLayoutProps {
	children: ReactNode;
	params: Promise<{ name: string }>;
}

export default async function CommunityLayout({
	children,
	params,
}: CommunityLayoutProps) {
	const { name } = await params;

	const community = await prisma.community.findUnique({
		where: {
			name,
		},
	});

	if (!community) {
		return notFound();
	}

	return (
		<PreloadQuery
			query={COMMUNITY_QUERY}
			variables={{
				name,
			}}
		>
			{children}
		</PreloadQuery>
	);
}
