import CommunityAbout from '@/components/community/CommunityAbout/CommunityAbout';
import ChooseCommunity from '@/components/submit/ChooseCommunity/ChooseCommunity';
import PostForm from '@/components/submit/PostForm/PostForm';
import PostRules from '@/components/submit/PostRules/PostRules';
import Grid from '@/components/ui/Grid/Grid';
import { COMMUNITY_QUERY } from '@/hooks/query/useCommunity';
import { PreloadQuery } from '@/lib/apollo';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

export default async function CommunitySubmit({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;

	const session = await auth();
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
		<PreloadQuery
			query={COMMUNITY_QUERY}
			variables={{
				name,
			}}
		>
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
		</PreloadQuery>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ name: string }>;
}): Promise<Metadata> {
	const { name } = await params;

	const community = await prisma.community.findFirst({
		where: {
			name,
		},
	});

	return {
		title: `Submit to ${community?.name}`,
	};
}
