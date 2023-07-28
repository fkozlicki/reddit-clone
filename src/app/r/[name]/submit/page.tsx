import ChooseCommunity from '@/components/ChooseCommunity/ChooseCommunity';
import CommunityAbout from '@/components/CommunityAbout/CommunityAbout';
import PostForm from '@/components/forms/PostForm/PostForm';
import Grid from '@/components/Grid/Grid';
import PostRules from '@/components/PostRules/PostRules';
import { notFound } from 'next/navigation';
import React from 'react';

const page = async ({ params: { name } }: { params: { name: string } }) => {
	const community = await prisma?.community.findUnique({
		where: {
			name,
		},
	});

	if (!community) {
		return notFound();
	}

	return (
		<div className="flex-1 min-h-[calc(100vh-48px)] bg-background-feed">
			<div className="flex justify-center gap-6 pt-6">
				<div className="w-full lg:w-auto lg:min-w-[640px]">
					<div className="mb-4 font-medium">Create a post</div>
					<div className="w-full h-px bg-background-primary my-4" />
					<ChooseCommunity community={community} />
					<PostForm communityId={community.id} />
				</div>
				<div className="w-[312px] hidden lg:block flex-shrink-0">
					<CommunityAbout withName />
					<div className="h-5" />
					<PostRules />
				</div>
			</div>
		</div>
	);
};

export default page;
