'use client';

import Button from '@/components/ui/Button/Button';
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Avatar from '../ui/Avatar/Avatar';
import TextField from '../ui/TextField/TextField';

const CreatePost = () => {
	const { push } = useRouter();
	const { data: session } = useSession();

	return (
		<div className="bg-primary p-2 flex gap-3 items-center border border-post rounded mb-4">
			<Avatar url={session?.user.image} alt="avatar" size={38} />
			<div className="flex-1">
				<TextField
					onClick={() => push('/submit')}
					placeholder="Create Post"
					className="w-full text-sm hover:border-button focus:border-button"
				/>
			</div>
			<div className="flex">
				<Button
					size="large"
					variant="secondary"
					shape="square"
					icon={<PhotoIcon width={18} />}
				/>
				<Button
					size="large"
					variant="secondary"
					icon={<LinkIcon width={18} />}
					shape="square"
				/>
			</div>
		</div>
	);
};

export default CreatePost;
