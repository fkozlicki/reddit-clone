'use client';

import Avatar from '@/components/ui/Avatar/Avatar';
import { useChatContext } from '@/contexts/ChatContext';
import useConversations from '@/hooks/query/useConversations';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React from 'react';

const ChatsList = () => {
	const { data, loading, error } = useConversations();
	const { data: session } = useSession();
	const [, dispatch] = useChatContext();

	if (loading) {
		return <div>Loading</div>;
	}

	if (error) {
		return <div>Couldn`t load data {error.message}</div>;
	}

	if (data && data.conversations.length === 0) {
		return <div>You have no conversations</div>;
	}

	return (
		<div className="flex flex-col">
			{data &&
				data.conversations.map((converstaion) => {
					const receiver = converstaion.participants.find(
						(user) => user.id !== session?.user.id
					);

					const changeChat = () => {
						dispatch({ type: 'setUser', payload: receiver as User });
						dispatch({ type: 'setConversationId', payload: converstaion.id });
					};

					return (
						<div
							onClick={changeChat}
							key={converstaion.id}
							className="flex gap-2 p-2 items-center hover:bg-btn-text cursor-pointer"
						>
							<Avatar size={32} url={receiver?.image} />
							<div className="flex flex-col items-start">
								<span className="text-sm">{receiver?.name}</span>
								<span className="text-xs">
									{converstaion.lastMessage.author.id === session?.user.id &&
										'You: '}
									{converstaion.lastMessage.content}
								</span>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default ChatsList;
