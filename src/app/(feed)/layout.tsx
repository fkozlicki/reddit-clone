import HomeCTA from '@/components/feed-layout/HomeCTA/HomeCTA';
import PremiumCTA from '@/components/feed-layout/PremiumCTA/PremiumCTA';
import Grid from '@/components/ui/Grid/Grid';
import { auth } from '@/lib/auth';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
const CreatePost = dynamic(
	() => import('@/components/feed-layout/CreatePost/CreatePost')
);

export default async function FeedLayout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await auth();

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
