'use client';

import Button from '@/components/ui/Button/Button';
import TextField from '@/components/ui/TextField/TextField';
import { useChatContext } from '@/contexts/ChatContext';
import useCreateMessage from '@/hooks/mutation/useCreateMessage';
import useIncomingMessage from '@/hooks/subscription/useIncomingMessage';
import {
	ChatBubbleLeftEllipsisIcon,
	PaperAirplaneIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const messageSchema = z.object({
	content: z.string().min(1),
});

type MessageValues = z.infer<typeof messageSchema>;

const ChatRoom = () => {
	const [messages, setMessages] = useState([]);
	const [{ open, user }, dispatch] = useChatContext();
	const { register, handleSubmit, reset } = useForm<MessageValues>({
		resolver: zodResolver(messageSchema),
	});
	const [createMessage, { data, loading }] = useCreateMessage();
	const { data: incomingMessageData } = useIncomingMessage();

	useEffect(() => {
		if (incomingMessageData) {
			console.log(incomingMessageData.message);
		}
	}, [incomingMessageData]);

	const closeChat = () => {
		dispatch({ type: 'setUser', payload: undefined });
		dispatch({ type: 'setOpen', payload: false });
	};

	const sendMessage = ({ content }: MessageValues) => {
		createMessage({
			variables: {
				receiverId: user?.id,
				content,
			},
			onCompleted() {
				reset();
			},
		});
	};

	if (!open) {
		return null;
	}

	return (
		<div className="fixed right-5 bottom-0 bg-primary rounded-t-lg flex h-[506px] w-[632px] z-20 drop-shadow-xl border border-input text-primary">
			<div className="border-r border-input min-w-[220px]">
				<div className="border-b border-input p-3 flex justify-between items-center">
					<div className="text-lg font-semibold">Chats</div>
					<Button
						variant="text"
						icon={<ChatBubbleLeftEllipsisIcon className="w-4" />}
					/>
				</div>
			</div>
			<div className="flex-1 flex flex-col">
				<div className="p-2 flex justify-between border-b border-input items-center">
					<div className="font-semibold text-sm">{user?.name}</div>
					<div>
						<Button
							onClick={closeChat}
							variant="text"
							icon={<XMarkIcon className="w-5" />}
						/>
					</div>
				</div>
				<div className="flex-1 flex flex-col">
					<div className="flex-1">empty</div>
					<div className="p-2 border-t border-input">
						<form
							onSubmit={handleSubmit(sendMessage)}
							className="flex items-center gap-2"
						>
							<TextField
								{...register('content')}
								className="rounded-full"
								placeholder="Message"
							/>
							<Button
								type="submit"
								icon={<PaperAirplaneIcon className="w-5" />}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatRoom;
