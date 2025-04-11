import Feed from '@/components/feed-layout/Feed/Feed';
import TopCommunities from '@/components/topic/TopCommunities/TopCommunities';
import Grid from '@/components/ui/Grid/Grid';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function Topic({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const topic = await prisma.topic.findUnique({
		where: { slug },
	});

	if (!topic) {
		notFound();
	}

	return (
		<div className="py-6">
			<Grid
				left={<Feed filter={{ community: { topic: { slug } } }} />}
				right={<TopCommunities topicSlug={slug} />}
			/>
		</div>
	);
}
