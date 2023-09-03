import CommunityScreen from '@/components/CommunityScreen/CommunityScreen';
import { notFound } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/prisma';

const page = async ({ params: { name } }: { params: { name: string } }) => {
	const community = await prisma.community.findUnique({
		where: {
			name,
		},
	});

	if (!community) {
		return notFound();
	}

	return <CommunityScreen name={name} feedType="hot" highlighted="hot" />;
};

export default page;
