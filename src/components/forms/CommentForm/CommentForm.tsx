'use client';

import React, { FormEvent, useState } from 'react';
import Button from '../../buttons/Button/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { gql, useMutation } from '@apollo/client';
import { InitialComment } from '../../CommentsSection/CommentsSection';
import Spinner from '@/components/Spinner/Spinner';
import { useModalsContext } from '@/contexts/ModalsContext';

const commentSchema = z.object({
	content: z.string().min(1),
});

type CommentValues = z.infer<typeof commentSchema>;

export const CreateCommentMutation = gql`
	mutation ($postId: String!, $content: String!, $replyToId: String) {
		createComment(postId: $postId, content: $content, replyToId: $replyToId) {
			id
			content
			createdAt
			author {
				name
			}
			votes {
				id
			}
		}
	}
`;

interface CommentFormProps {
	postId: string;
	updateComments: (newComment: InitialComment) => void;
	replyToId?: string;
}

const CommentForm = ({
	postId,
	updateComments,
	replyToId,
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
	const [createComment, { loading }] = useMutation(CreateCommentMutation, {
		onCompleted({ createComment }) {
			reset();
			updateComments(createComment);
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
				replyToId,
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
				<div className="mb-1 text-xs">
					Comment as <span className="text-primary">{session.user.name}</span>
				</div>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`border ${
					focus ? 'border-black' : 'border-border-input'
				} flex flex-col rounded overflow-hidden`}
			>
				<textarea
					{...register('content')}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					placeholder="What are your thoughts?"
					className={`w-full resize-y outline-none text-sm min-h-[125px] m-0 py-2 px-3`}
				></textarea>
				<div className="bg-background-post-side flex justify-end p-1">
					<Button
						filled
						disabled={!isValid || loading}
						classNames="text-xs w-auto h-6"
						onClick={!session ? openSignIn : undefined}
					>
						{loading ? <Spinner /> : 'Comment'}
					</Button>
				</div>
			</form>
		</>
	);
};

export default CommentForm;
