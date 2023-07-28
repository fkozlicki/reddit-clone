'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { DocumentNode, gql, useQuery } from '@apollo/client';
import {
	Comment,
	Community,
	Post as PrismaPost,
	User,
	Vote,
} from '@prisma/client';
import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';

type PostsQueryResponse = {
	posts: (PrismaPost & {
		comments: Comment[];
		votes: Vote[];
		community: Community;
		author: User;
	})[];
};
type PostsQueryValues = {
	offset: number;
	limit: number;
};

interface FeedProps {
	query: DocumentNode;
}

const Feed = ({ query }: FeedProps) => {
	const [hasMoreData, setHasMoreData] = useState<boolean>(true);
	const { data, fetchMore, loading } = useQuery<
		PostsQueryResponse,
		PostsQueryValues
	>(query, {
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
		onError(error) {
			console.error(error);
		},
		variables: {
			offset: 0,
			limit: 2,
		},
	});
	const [ref, entry] = useIntersectionObserver<HTMLDivElement>();

	useEffect(() => {
		if (entry && entry.isIntersecting && !loading && data && hasMoreData) {
			fetchMore({
				variables: {
					offset: data.posts.length,
					limit: 2,
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					if (!fetchMoreResult) return prev;
					if (fetchMoreResult.posts.length === 0) {
						setHasMoreData(false);
					}
					return {
						posts: [...prev.posts, ...fetchMoreResult.posts],
					};
				},
			});
		}
	}, [entry, loading, fetchMore, data, hasMoreData]);

	return (
		<div className="flex flex-col gap-6">
			{data &&
				data.posts.map(
					({
						id,
						author,
						content,
						title,
						createdAt,
						votes,
						comments,
						community,
					}) => (
						<Post
							key={id}
							id={id}
							authorName={author.name}
							content={content}
							title={title}
							createdAt={createdAt}
							votes={votes}
							comments={comments}
							communityName={community.name}
						/>
					)
				)}
			<div ref={ref}>
				{loading && <p>Loading...</p>}
				{!hasMoreData && <p className="text-center mb-4">No more posts</p>}
			</div>
		</div>
	);
};

export default Feed;
