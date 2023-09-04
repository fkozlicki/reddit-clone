'use client';

import React from 'react';
import Button from '../../buttons/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Input from '../../inputs/Input/Input';
import useCreatePost from '@/hooks/mutation/useCreatePost';

interface PostFormProps {
	communityId?: string;
}

const createPostSchema = z.object({
	communityId: z.string().min(1),
	title: z.string().min(1),
	content: z.string().min(1),
});

type CreatePostValues = z.infer<typeof createPostSchema>;

const PostForm = ({ communityId }: PostFormProps) => {
	const { push } = useRouter();
	const {
		handleSubmit,
		register,
		formState: { isValid },
		reset,
	} = useForm<CreatePostValues>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			communityId,
		},
	});
	const [createPost, { loading }] = useCreatePost({
		onCompleted({
			createPost: {
				id,
				community: { name },
			},
		}) {
			reset();
			toast('Post created successfuly', {
				icon: '✅',
			});
			push(`/r/${name}/comments/${id}`);
		},
	});

	const onSubmit = (values: CreatePostValues) => {
		createPost({ variables: values });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="bg-primary p-3 rounded">
			<Input
				placeholder="Title"
				register={register('title')}
				classNames="text-sm"
			/>
			<div className="w-full h-4" />
			<Input
				placeholder="Text"
				register={register('content')}
				classNames="text-sm"
				textarea
			/>
			<div className="w-full h-4" />
			<div className="flex justify-end">
				<Button
					type="submit"
					classNames="w-auto"
					filled
					disabled={!isValid || loading}
				>
					Post
				</Button>
			</div>
		</form>
	);
};

export default PostForm;
