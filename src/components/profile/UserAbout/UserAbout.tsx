'use client';

import Avatar from '@/components/ui/Avatar/Avatar';
import Button from '@/components/ui/Button/Button';
import { useChatContext } from '@/contexts/ChatContext';
import { formatDate } from '@/utils/formatDate';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

interface UserAboutProps {
	user: User;
}

const UserAbout = ({ user }: UserAboutProps) => {
	const { data: session } = useSession();
	const [, dispatch] = useChatContext();

	const setChatUser = () => {
		dispatch({ type: 'setUser', payload: user });
		dispatch({ type: 'setOpen', payload: true });
	};

	return (
		<div className="bg-primary rounded overflow-hidden text-primary border border-post">
			<div className="h-20 bg-button"></div>
			<div className="flex justify-center -mt-[50px]">
				<Avatar size={100} url={user.image} alt="user avatar" />
			</div>
			<div className="p-4">
				<div className="text-2xl font-medium text-center">
					{user.displayName ?? user.name}
				</div>
				<div className="text-xs font-medium text-gray-500 text-center mb-4">
					u/{user.name}
				</div>
				<div className="flex">
					<div className="flex-1">
						<div className="text-sm font-medium mb-1">Karma</div>
						<div className="text-xs text-gray-500">222</div>
					</div>
					<div className="flex-1">
						<div className="text-sm font-medium mb-1">Joined</div>
						<div className="text-xs text-gray-500">
							{formatDate(new Date(user.createdAt))}
						</div>
					</div>
				</div>
				{user.name === session?.user.name && (
					<>
						<div className="h-4" />
						<Link href="/submit">
							<Button variant="primary" className="w-full">
								Create Post
							</Button>
						</Link>
					</>
				)}
				{session?.user.id !== user.id && (
					<Button
						onClick={setChatUser}
						variant="primary"
						className="w-full mt-4"
					>
						Chat
					</Button>
				)}
			</div>
		</div>
	);
};

export default UserAbout;
