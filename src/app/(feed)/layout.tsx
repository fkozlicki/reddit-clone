import HomeCTA from '@/components/feed-layout/HomeCTA/HomeCTA';
import PremiumCTA from '@/components/feed-layout/PremiumCTA/PremiumCTA';
import Grid from '@/components/ui/Grid/Grid';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import dynamic from 'next/dynamic';
const CreatePost = dynamic(
	() => import('@/components/feed-layout/CreatePost/CreatePost')
);

export default async function FeedLayout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return (
		<div className="sm:px-4 py-6">
			<Grid
				left={
					<>
						{session && <CreatePost />}
						{!session && (
							<div className="text-sm font-medium mb-2">Popular posts</div>
						)}
						{children}
					</>
				}
				right={
					<>
						{!session && <div className="h-7" />}
						<PremiumCTA />
						<HomeCTA />
					</>
				}
			/>
		</div>
	);
}
