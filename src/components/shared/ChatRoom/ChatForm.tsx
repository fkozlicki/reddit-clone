'use client';

import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { useChatContext } from '@/contexts/ChatContext';
import useCreateConversation from '@/hooks/mutation/useCreateConversation';
import useCreateMessage from '@/hooks/mutation/useCreateMessage';
import { CONVERSATIONS_QUERY } from '@/hooks/query/useConversations';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaperPlaneRight } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const messageSchema = z.object({
	content: z.string().min(1),
});

type MessageValues = z.infer<typeof messageSchema>;

interface ChatFormProps {
	userId: string;
	conversationId?: string;
}

const ChatForm = ({ userId, conversationId }: ChatFormProps) => {
	const [createMessage, { loading }] = useCreateMessage();
	const [createConversation] = useCreateConversation();
	const { register, handleSubmit, reset } = useForm<MessageValues>({
		resolver: zodResolver(messageSchema),
	});
	const [, dispatch] = useChatContext();

	const onSubmit = ({ content }: MessageValues) => {
		if (conversationId) {
			createMessage({
				variables: { content, conversationId },
				onCompleted() {
					reset();
				},
			});
		} else {
			createConversation({
				variables: {
					userId,
				},
				onCompleted({ createConversation }) {
					createMessage({
						variables: { content, conversationId: createConversation.id },
						onCompleted() {
							reset();
							dispatch({
								type: 'setConversationId',
								payload: createConversation.id,
							});
						},
						update: (cache, result) => {
							cache.updateQuery(
								{
									query: CONVERSATIONS_QUERY,
								},
								(data) => {
									if (!data) {
										return;
									}

									return {
										...data,
										conversations: [
											{
												...createConversation,
												lastMessage: result.data?.createMessage,
											},
											...data.conversations,
										],
									};
								}
							);
						},
					});
				},
			});
		}
	};

	return (
		<div className="p-2 border-t border-input">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex items-center gap-2"
			>
				<Input
					{...register('content')}
					className="rounded-full"
					placeholder="Message"
					disabled={loading}
				/>
				<Button
					disabled={loading}
					type="submit"
					icon={<PaperPlaneRight size={20} />}
				/>
			</form>
		</div>
	);
};

export default ChatForm;
