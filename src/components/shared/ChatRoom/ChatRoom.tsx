'use client';

import Button from '@/components/ui/Button/Button';
import { useChatContext } from '@/contexts/ChatContext';

import {
	ChatBubbleLeftEllipsisIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';
import ChatsList from './ChatsList';

const ChatRoom = () => {
	const [{ open, user, conversationId }, dispatch] = useChatContext();

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
				<ChatsList />
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
				<div className="flex flex-col h-full overflow-y-auto">
					{conversationId ? (
						<ChatMessages conversationId={conversationId} />
					) : (
						<div className="flex-1 flex items-center justify-center">
							<div className="flex flex-col items-center">
								<ChatBubbleOvalLeftEllipsisIcon width={64} />
								<span>Select chat</span>
							</div>
						</div>
					)}
					{user && (
						<ChatForm userId={user.id} conversationId={conversationId} />
					)}
				</div>
			</div>
		</div>
	);
};

export default ChatRoom;
