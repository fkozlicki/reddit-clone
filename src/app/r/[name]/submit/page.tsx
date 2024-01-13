import ChooseCommunity from '@/components/submit/ChooseCommunity/ChooseCommunity';
import PostForm from '@/components/submit/PostForm/PostForm';
import PostRules from '@/components/submit/PostRules/PostRules';
import { notFound } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/prisma';
import Grid from '@/components/ui/Grid/Grid';
import CommunityAbout from '@/components/community/CommunityAbout/CommunityAbout';

const page = async ({ params: { name } }: { params: { name: string } }) => {
	const community = await prisma.community.findUnique({
		where: {
			name,
		},
	});

	if (!community) {
		return notFound();
	}

	return (
		<div className="py-6 px-4">
			<Grid
				left={
					<>
						<div className="mb-4 font-medium">Create a post</div>
						<div className="w-full h-px bg-primary my-4" />
						<ChooseCommunity community={community} />
						<PostForm communityId={community.id} />
					</>
				}
				right={
					<>
						<CommunityAbout withName />
						<div className="h-5" />
						<PostRules />
					</>
				}
			/>
		</div>
	);
};

export default page;
