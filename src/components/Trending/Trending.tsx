import { Community } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { prisma } from '@/lib/prisma';

interface PostProps {
	id: string;
	title: string;
	content: string;
	community: Community;
}

const Post = ({ id, title, content, community }: PostProps) => {
	return (
		<Link
			href={`/r/${community.name}/comments/${id}`}
			className="relative h-44 bg-primary flex-1 rounded-lg min-w-[208px] max-w-[375px] p-3 overflow-hidden"
		>
			<div className="mt-16 z-0">
				<div className="font-bold text-lg line-clamp-1 text-primary">
					{title}
				</div>
				<div className="text-sm h-10 overflow-hidden text-ellipsis line-clamp-2 mb-2 text-primary">
					{content}
				</div>
				<div className="text-xs text-primary">r/{community.name}</div>
			</div>
			<div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/80 from-0% to-black/15 to-100%"></div>
		</Link>
	);
};

const Trending = async () => {
	const posts = await prisma.post.findMany({
		orderBy: {
			comments: {
				_count: 'desc',
			},
		},
		include: {
			community: true,
		},
	});

	if (!posts || posts.length === 0) {
		return null;
	}

	return (
		<div className="mb-4 max-w-[1020px] m-auto pt-4 px-10 sm:px-6">
			<div>
				<div className="text-sm font-medium mb-2">Trending today</div>
				<div className="flex gap-3 overflow-hidden flex-wrap h-44">
					{posts.map((post, index) => (
						<Post key={index} {...post} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Trending;
