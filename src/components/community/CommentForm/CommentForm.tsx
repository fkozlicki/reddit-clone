'use client';

import Button from '@/components/ui/Button/Button';
import Textarea from '@/components/ui/Textarea/Textarea';
import { useModalsContext } from '@/contexts/ModalsContext';
import useCreateComment from '@/hooks/mutation/useCreateComment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const commentSchema = z.object({
	content: z.string().min(1),
});

type CommentValues = z.infer<typeof commentSchema>;

interface CommentFormProps {
	postId: string;
	replyToId?: string;
}

const CommentForm = ({ postId, replyToId }: CommentFormProps) => {
	const [, dispatch] = useModalsContext();
	const { data: session } = useSession();
	const [focus, setFocus] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { isValid },
		reset,
	} = useForm<CommentValues>({
		resolver: zodResolver(commentSchema),
	});
	const [createComment] = useCreateComment({
		onCompleted() {
			reset();
		},
	});

	const onSubmit = (values: CommentValues) => {
		if (!session) {
			return;
		}

		createComment({
			variables: {
				postId,
				content: values.content,
				replyToId: replyToId ?? null,
			},
			optimisticResponse: {
				createComment: {
					__typename: 'Comment',
					id: 'temp-id',
					author: {
						id: session.user.id,
						name: session.user.name,
						image: session.user.image as string,
					},
					content: values.content,
					createdAt: new Date(),
					karma: 0,
					postId,
					voteValue: null,
					replies: [],
				},
			},
		});
	};

	const openSignIn = (event: FormEvent) => {
		event.preventDefault();
		dispatch({ type: 'openSignIn' });
	};

	return (
		<>
			{session && !replyToId && (
				<div className="mb-1 text-xs text-primary">
					Comment as <span className="text-blue-400">{session.user.name}</span>
				</div>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`border ${
					focus ? 'border-focus' : 'border-input'
				} flex flex-col rounded overflow-hidden`}
			>
				<Textarea
					{...register('content')}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					placeholder="What are your thoughts?"
					className="min-h-[125px] bg-primary border-none"
				/>
				<div className="bg-post-side flex justify-end p-1">
					<Button
						variant="primary"
						disabled={!isValid}
						size="small"
						onClick={!session ? openSignIn : undefined}
					>
						Comment
					</Button>
				</div>
			</form>
		</>
	);
};

export default CommentForm;
