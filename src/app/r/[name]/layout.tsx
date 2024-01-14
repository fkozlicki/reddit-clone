import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export interface CommunityLayoutProps {
	children: ReactNode;
	params: { name: string };
}

export default async function CommunityLayout({
	children,
	params: { name },
}: CommunityLayoutProps) {
	const community = await prisma.community.findUnique({
		where: {
			name,
		},
	});

	if (!community) {
		return notFound();
	}

	return <>{children}</>;
}
