import Feed from '@/components/feed-layout/Feed/Feed';
import TopCommunities from '@/components/topic/TopCommunities/TopCommunities';
import Grid from '@/components/ui/Grid/Grid';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

const page = async ({ params: { name } }: { params: { name: string } }) => {
	const topic = await prisma.topic.findUnique({
		where: { name },
	});

	if (!topic) {
		notFound();
	}

	return (
		<div className="py-6">
			<Grid
				left={<Feed type="hot" topicName={name} />}
				right={<TopCommunities topicName={name} />}
			/>
		</div>
	);
};

export default page;
