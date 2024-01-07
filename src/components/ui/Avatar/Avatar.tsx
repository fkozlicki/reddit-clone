import { UserIcon } from '@heroicons/react/24/outline';
import { User } from 'next-auth';
import Image from 'next/image';
import React from 'react';

interface AvatarProps {
	url: User['image'];
	alt?: string;
	size: number;
}

const Avatar = ({ url, alt, size }: AvatarProps) => {
	return url && alt ? (
		<Image
			src={url}
			alt={alt}
			width={size}
			height={size}
			className="rounded-full"
		/>
	) : (
		<div
			className="bg-gray-400 rounded-full text-white flex items-center justify-center"
			style={{ width: size, height: size }}
		>
			<UserIcon width={16} />
		</div>
	);
};

export default Avatar;
