'use client';

import Button from '@/components/ui/Button/Button';
import TextField from '@/components/ui/TextField/TextField';
import { useChatContext } from '@/contexts/ChatContext';
import {
	ChatBubbleLeftEllipsisIcon,
	PaperAirplaneIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

const ChatRoom = () => {
	const [{ open, user }, dispatch] = useChatContext();

	const closeChat = () => {
		dispatch({ type: 'setUser', payload: undefined });
		dispatch({ type: 'setOpen', payload: false });
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
					<div className="flex-1">content</div>
					<div className="flex p-2 items-center gap-2">
						<TextField className="rounded-full" placeholder="Message" />
						<Button icon={<PaperAirplaneIcon className="w-5" />} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatRoom;
