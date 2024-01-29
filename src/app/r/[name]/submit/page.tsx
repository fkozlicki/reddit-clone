import ChooseCommunity from '@/components/submit/ChooseCommunity/ChooseCommunity';
import PostForm from '@/components/submit/PostForm/PostForm';
import PostRules from '@/components/submit/PostRules/PostRules';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/prisma';
import Grid from '@/components/ui/Grid/Grid';
import CommunityAbout from '@/components/community/CommunityAbout/CommunityAbout';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function CommunitySubmit({
	params: { name },
}: {
	params: { name: string };
}) {
	const session = await getServerSession(authOptions);
	const community = await prisma.community.findUnique({
		where: {
			name,
		},
	});

	if (!session) {
		redirect('/');
	}

	if (!community) {
		notFound();
	}

	return (
		<div className="py-6 px-4">
			<Grid
				left={
					<>
						<div className="mb-4 font-medium text-primary">Create a post</div>
						<div className="w-full h-px bg-primary my-4" />
						<ChooseCommunity
							userName={session.user.name}
							community={community}
						/>
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
}

export async function generateMetadata({
	params: { name },
}: {
	params: { name: string };
}): Promise<Metadata> {
	const community = await prisma.community.findFirst({
		where: {
			name,
		},
	});

	return {
		title: `Submit to ${community?.name}`,
	};
}
