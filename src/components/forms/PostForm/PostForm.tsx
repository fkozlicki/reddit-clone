'use client';

import React from 'react';
import Button from '../../buttons/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Input from '../../inputs/Input/Input';

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
		reset,
	} = useForm<CreatePostValues>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			communityId,
		},
	});
	const [createPost, { loading }] = useMutation<
		CreatePostResponse,
		CreatePostValues
	>(createPostMutation, {
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
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-background-primary p-3 rounded"
		>
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
