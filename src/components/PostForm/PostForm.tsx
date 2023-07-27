'use client';

import React from 'react';
import Button from '../buttons/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

interface PostFormProps {
	communityId?: string;
}

type CreatePostValues = z.infer<typeof createPostSchema>;

type CreatePostResponse = {
	createPost: {
		id: string;
		community: {
			name: string;
		};
	};
};

const createPostSchema = z.object({
	communityId: z.string().min(1),
	title: z.string().min(1),
	content: z.string().min(1),
});

const createPostMutation = gql`
	mutation ($title: String!, $content: String!, $communityId: String!) {
		createPost(title: $title, content: $content, communityId: $communityId) {
			id
			community {
				name
			}
		}
	}
`;

const PostForm = ({ communityId }: PostFormProps) => {
	const { push } = useRouter();
	const {
		handleSubmit,
		register,
		formState: { isValid },
	} = useForm<CreatePostValues>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			communityId,
		},
	});
	const [createPost] = useMutation<CreatePostResponse, CreatePostValues>(
		createPostMutation,
		{
			onCompleted({
				createPost: {
					id,
					community: { name },
				},
			}) {
				push(`/r/${name}/comments/${id}`);
			},
		}
	);

	const onSubmit = (values: CreatePostValues) => {
		createPost({ variables: values });
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-background-primary p-3 rounded"
		>
			<input
				{...register('title')}
				type="text"
				className="w-full outline-none border border-border-input mb-2 rounded text-sm py-2 px-3 focus:border-black"
				placeholder="Title"
			/>
			<textarea
				{...register('content')}
				placeholder="Text (optional)"
				className="w-full resize-y outline-none border border-border-input rounded py-2 px-3 focus:border-black text-sm min-h-[150px] mb-2"
			></textarea>
			<div className="flex justify-end">
				<Button
					text="Post"
					type="submit"
					width="w-auto"
					filled
					disabled={!isValid}
				/>
			</div>
		</form>
	);
};

export default PostForm;
