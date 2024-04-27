'use client';

import Button from '@/components/ui/Button/Button';
import { ImageSquare, Link } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Avatar from '../../ui/Avatar/Avatar';
import Input from '../../ui/Input/Input';

const CreatePost = () => {
	const { push } = useRouter();
	const { data: session } = useSession();

	return (
		<div className="bg-primary p-2 flex gap-3 items-center border border-post rounded mb-4">
			<Avatar url={session?.user.image} alt="avatar" size={38} />
			<div className="flex-1">
				<Input
					onClick={() => push('/submit')}
					placeholder="Create Post"
					className="w-full text-sm hover:border-post-hover focus:border-post-hover"
				/>
			</div>
			<div className="flex">
				<Button
					size="large"
					variant="text"
					shape="square"
					icon={<ImageSquare size={20} />}
					aria-label="Image post"
				/>
				<Button
					aria-label="Link post"
					size="large"
					variant="text"
					icon={<Link size={20} />}
					shape="square"
				/>
			</div>
		</div>
	);
};

export default CreatePost;
