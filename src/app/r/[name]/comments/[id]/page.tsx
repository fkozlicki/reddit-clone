import PostDetails from '@/components/community/PostDetails/PostDetails';
import { prisma } from '@/lib/prisma';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

type Commentsrops = {
	params: { id: string };
};

export default async function Comments({ params: { id } }: Commentsrops) {
	const post = await prisma.post.findFirst({
		where: {
			id,
		},
	});

	if (!post) {
		notFound();
	}

	return (
		<div className="bg-black/60">
			<div className="max-w-7xl m-auto sm:p-6 h-full flex bg-details min-h-[calc(100vh-48px)]">
				<PostDetails id={id} />
			</div>
		</div>
	);
}

export async function generateMetadata({
	params,
}: Commentsrops): Promise<Metadata> {
	const id = params.id;

	const post = await prisma.post.findFirst({
		where: {
			id,
		},
	});

	return {
		title: post?.title,
	};
}
