import ProfileNavigation from '@/components/profile/ProfileNavigation/ProfileNavigation';
import UserAbout from '@/components/profile/UserAbout/UserAbout';
import Grid from '@/components/ui/Grid/Grid';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export default async function UserLayout({
	children,
	params: { name },
}: {
	children: ReactNode;
	params: { name: string };
}) {
	const user = await prisma.user.findUnique({
		where: {
			name,
		},
	});

	if (!user) {
		notFound();
	}

	return (
		<>
			<ProfileNavigation />
			<div className="sm:px-4 py-6">
				<Grid left={children} right={<UserAbout user={user} />} />
			</div>
		</>
	);
}
