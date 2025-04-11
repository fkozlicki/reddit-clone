import CommentDetails from '@/components/community/CommentDetails/CommentDetails';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

type CommentPageProps = {
	params: Promise<{
		postId: string;
		commentId: string;
	}>;
};

export default async function CommentPage({ params }: CommentPageProps) {
	const { commentId, postId } = await params;

	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
	});
	const comment = await prisma.comment.findUnique({
		where: {
			id: commentId,
		},
	});

	if (!post || !comment) {
		notFound();
	}

	return <CommentDetails postId={postId} commentId={commentId} />;
}
