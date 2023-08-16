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
import PostSkeleton from '../PostSkeleton/PostSkeleton';

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
		notifyOnNetworkStatusChange: true,
		onError(error) {
			console.error(error);
		},
		variables: {
			offset: 0,
			limit: 10,
		},
	});
	const [ref, entry] = useIntersectionObserver<HTMLDivElement>();

	useEffect(() => {
		if (entry && entry.isIntersecting && !loading && data && hasMoreData) {
			fetchMore({
				variables: {
					offset: data.posts.length,
					limit: 10,
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
				{loading &&
					Array.from({ length: 3 }).map((_, index) => (
						<>
							<PostSkeleton key={index} />
							<div className="h-6" />
						</>
					))}
				{data && data.posts.length === 0 && (
					<div className="text-center mb-4 bg-background-primary p-3 border border-border-post rounded">
						No posts
					</div>
				)}
				{data && data.posts.length > 0 && !hasMoreData && (
					<div className="text-center mb-4 bg-background-primary p-3 border border-border-post rounded">
						No more posts
					</div>
				)}
			</div>
		</div>
	);
};

export default Feed;
