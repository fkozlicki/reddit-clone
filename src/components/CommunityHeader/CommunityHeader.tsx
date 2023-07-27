'use client';

import Image from 'next/image';
import React from 'react';
import Button from '../buttons/Button/Button';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

interface CommunityHeaderProps {
	members: User[];
}

const CommunityHeader = ({ members }: CommunityHeaderProps) => {
	const params = useParams();
	const name = params.name as string;
	const { data: session } = useSession();

	return (
		<div className="bg-background-primary">
			<div className="h-16 bg-blue-400"></div>
			<div className="max-w-[976px] m-auto">
				<div className="flex gap-5 items-start">
					<div className="p-1 rounded-full -mt-4 bg-background-primary">
						<Image src="/community.svg" alt="" width={64} height={64} />
					</div>
					<div className="flex items-start gap-8 my-2">
						<div className="">
							<div className="text-2xl font-bold">{name}</div>
							<div className="text-sm text-text-gray">r/{name}</div>
						</div>
						<Button
							text={
								members.some((member) => member.name === session?.user.name)
									? 'Joined'
									: 'Join'
							}
							width="w-24"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommunityHeader;
