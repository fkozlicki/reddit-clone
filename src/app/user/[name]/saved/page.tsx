import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Feed from '@/components/feed-layout/Feed/Feed';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function UserSavedPosts() {
	const session = await getServerSession(authOptions);

	return <Feed filter={{ savedBy: { some: { id: session?.user.id } } }} />;
}
