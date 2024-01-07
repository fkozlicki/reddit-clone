import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';
import { notFound } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/prisma';
import Grid from '@/components/ui/Grid/Grid';
import Feed from '@/components/feed-layout/Feed/Feed';

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
		<>
			<div className="bg-primary p-2">
				<div className="max-w-[976px] m-auto text-primary">{name} Profile</div>
			</div>
			<div className="px-4 py-6">
				<Grid
					left={<Feed type="hot" authorName={name} />}
					right={
						<div className="bg-primary p-3 rounded text-primary">
							<div className="text-lg font-semibold">{user.name}</div>
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
		</>
	);
};

export default page;
