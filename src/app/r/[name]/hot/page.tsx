import { notFound } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/prisma';
import CommunityView from '@/components/views/CommunityView';

const page = async ({ params: { name } }: { params: { name: string } }) => {
	const community = await prisma.community.findUnique({
		where: {
			name,
		},
	});

	if (!community) {
		return notFound();
	}

	return <CommunityView name={name} feedType="hot" highlighted="hot" />;
};

export default page;
