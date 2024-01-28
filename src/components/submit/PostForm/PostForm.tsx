'use client';

import Button from '@/components/ui/Button/Button';
import Editor from '@/components/ui/Editor/Editor';
import TextField from '@/components/ui/TextField/TextField';
import useCreatePost from '@/hooks/mutation/useCreatePost';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

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
		setValue,
		watch,
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
			toast.success('Post created successfuly');
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
				{...register('title')}
				className="w-full mb-4"
			/>
			<Editor onChange={(data) => setValue('content', data)} />
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
