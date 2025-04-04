import SettingsView from '@/components/views/SettingsView';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

export default async function Settings() {
	const session = await auth();

	if (!session) {
		redirect('/');
	}

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.id,
		},
	});

	if (!user) {
		notFound();
	}

	return <SettingsView user={user} />;
}
