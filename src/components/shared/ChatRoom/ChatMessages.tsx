'use client';

import useMessages, { MessageItem } from '@/hooks/query/useMessages';
import { cn } from '@/lib/utils';
import { gql } from '@apollo/client';
import { CircleNotch } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const GET_MESSAGE_SUBSCRIPTION = gql`
	subscription IncomingMessage($conversationId: String!) {
		message(conversationId: $conversationId) {
			id
			content
			createdAt
			author {
				id
				name
				image
			}
		}
	}
`;

const ChatMessages = ({ conversationId }: { conversationId: string }) => {
	const { data, subscribeToMore, fetchMore, loading } = useMessages({
		variables: {
			conversationId,
			first: 10,
		},
		fetchPolicy: 'network-only',
	});
	const containerRef = useRef<HTMLDivElement>(null);
	const { ref, inView } = useInView();
	const { data: session } = useSession();
	const firstMessage = data?.messages.edges[0].node;

	useEffect(() => {
		containerRef.current?.scrollIntoView({
			behavior: 'instant',
			block: 'end',
		});
	}, [firstMessage]);

	useEffect(() => {
		if (inView && !loading && data?.messages.pageInfo.hasNextPage) {
			fetchMore({
				variables: {
					after: data.messages.pageInfo.endCursor,
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					fetchMoreResult.messages.edges = [
						...prev.messages.edges,
						...fetchMoreResult.messages.edges,
					];
					return fetchMoreResult;
				},
			});
		}
	}, [inView]);

	useEffect(() => {
		const unsubscribe = subscribeToMore<{ message: MessageItem }>({
			document: GET_MESSAGE_SUBSCRIPTION,
			variables: {
				conversationId,
			},
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev;
				}

				return Object.assign({}, prev, {
					messages: {
						...prev.messages,
						edges: [
							{
								cursor: subscriptionData.data.message.id,
								node: subscriptionData.data.message,
							},
							...prev.messages.edges,
						],
					},
				});
			},
		});

		return () => unsubscribe();
	}, [conversationId]);

	return (
		<div className="overflow-auto flex-1">
			{data && (
				<div
					ref={containerRef}
					className="flex flex-col-reverse gap-2 min-h-full p-2"
				>
					{data.messages.edges.map(({ node: message }) => (
						<div
							className={cn(
								'py-2 px-3 text-sm flex bg-btn-text self-start rounded-full text-primary',
								{
									'self-end bg-btn-primary text-primary-inverse':
										message.author.id === session?.user.id,
								}
							)}
							key={message.id}
						>
							{message.content}
						</div>
					))}
					<div ref={ref} className="flex justify-center">
						{loading && <CircleNotch width={16} className="animate-spin" />}
						{!(loading || data.messages.pageInfo.hasNextPage) && (
							<div className="text-sm">No more messages</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatMessages;
