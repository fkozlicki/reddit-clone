import SettingsView from '@/components/views/SettingsView';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

const page = async () => {
	const session = await getServerSession(authOptions);

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
};

export default page;
