'use client';

import React from 'react';
import Button from '@/components/ui/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import useCreatePost from '@/hooks/mutation/useCreatePost';
import TextField from '@/components/ui/TextField/TextField';

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
			<TextField
				placeholder="Title"
				register={register('title')}
				className="w-full mb-4"
			/>
			<TextField
				placeholder="Text"
				register={register('content')}
				className="mb-4 w-full"
			/>
			<Button
				variant="primary"
				className="block ml-auto"
				disabled={!isValid || loading}
				loading={loading}
			>
				Post
			</Button>
		</form>
	);
};

export default PostForm;
