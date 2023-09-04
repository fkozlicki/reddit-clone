'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import IconButton from '../buttons/IconButton/IconButton';
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const CreatePost = () => {
	const { push } = useRouter();
	const { data: session } = useSession();

	return (
		<div className="bg-primary p-2 flex gap-3 items-center border border-post rounded mb-4">
			{session?.user.image ? (
				<Image
					src={session.user.image}
					alt="profile image"
					width={40}
					height={40}
					className="rounded-full"
				/>
			) : (
				<div className="w-10 h-10 bg-black rounded-full"></div>
			)}
			<div className="flex-1">
				<input
					onClick={() => push('/submit')}
					type="text"
					className="bg-input w-full border border-input rounded outline-none text-sm placeholder:text-sm px-4 py-2 hover:border-button focus:border-button"
					placeholder="Create Post"
				/>
			</div>
			<div className="flex">
				<IconButton icon={<PhotoIcon width={20} />} shape="square" />
				<IconButton icon={<LinkIcon width={20} />} shape="square" />
			</div>
		</div>
	);
};

export default CreatePost;
