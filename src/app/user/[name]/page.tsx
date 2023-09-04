import Feed from '@/components/Feed/Feed';
import Grid from '@/components/Grid/Grid';
import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';
import { notFound } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/prisma';

const page = async ({ params: { name } }: { params: { name: string } }) => {
	const user = await prisma.user.findUnique({
		where: {
			name,
		},
	});

	if (!user) {
		return notFound();
	}

	return (
		<div className="flex-1  min-h-[calc(100vh-48px)]">
			<div className="bg-primary p-2">
				<div className="max-w-[976px] m-auto text-primary">{name} Profile</div>
			</div>
			<Grid
				left={<Feed type="hot" authorName={name} />}
				right={
					<div className="bg-primary p-3 rounded text-primary">
						<div>{user.name}</div>
						<div className="h-2" />
						<div className="text-xs">About:</div>
						{user.about && <div>{user.about}</div>}
						<div className="h-2" />
						<div className="text-xs">Joined:</div>
						<div>{calculateEllapsedTime(new Date(user.createdAt))}</div>
					</div>
				}
			/>
		</div>
	);
};

export default page;
