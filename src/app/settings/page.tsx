import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { notFound, redirect } from 'next/navigation';
import UserSettings from '@/components/UserSettings/UserSettings';
import { prisma } from '@/lib/prisma';

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
		return notFound();
	}

	const { name, displayName, about } = user;

	return (
		<div className="m-auto w-full">
			<div className="p-5 font-medium text-lg max-w-[1200px] m-auto border-b border-border-input mb-12">
				User settings
			</div>
			<div className="max-w-[1200px] m-auto">
				<UserSettings name={name} displayName={displayName} about={about} />
			</div>
		</div>
	);
};

export default page;
