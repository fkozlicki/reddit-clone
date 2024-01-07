'use client';

import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import useCreateComment from '@/hooks/mutation/useCreateComment';
import { PostComment } from '@/hooks/query/usePost';
import { zodResolver } from '@hookform/resolvers/zod';
import { Comment } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const commentSchema = z.object({
	content: z.string().min(1),
});

type CommentValues = z.infer<typeof commentSchema>;

interface CommentFormProps {
	postId: Comment['postId'];
	updateComments?: (
		newComment: PostComment | Omit<PostComment, 'replies' | 'votes'>
	) => void;
	updateReplies?: (newReply: any) => void;
	replyToId?: string;
}

const CommentForm = ({
	postId,
	replyToId,
	updateComments,
	updateReplies,
}: CommentFormProps) => {
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
	const [createComment, { loading }] = useCreateComment({
		onCompleted({ createComment }) {
			reset();

			updateComments && updateComments(createComment);
			updateReplies && updateReplies(createComment);
		},
		onError(error) {
			console.error(error);
		},
	});
	const [, dispatch] = useModalsContext();

	const onSubmit = (values: CommentValues) => {
		createComment({
			variables: {
				postId,
				content: values.content,
				replyToId: replyToId ?? null,
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
				<textarea
					{...register('content')}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					placeholder="What are your thoughts?"
					className={`w-full resize-y outline-none text-sm min-h-[125px] m-0 py-2 px-3 bg-primary`}
				></textarea>
				<div className="bg-post-side flex justify-end p-1">
					<Button
						variant="primary"
						disabled={!isValid || loading}
						size="small"
						onClick={!session ? openSignIn : undefined}
						loading={loading}
						className="disabled:bg-gray-400 disabled:hover:bg-gray-400"
					>
						Comment
					</Button>
				</div>
			</form>
		</>
	);
};

export default CommentForm;
