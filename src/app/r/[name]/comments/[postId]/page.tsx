import PostDetails from '@/components/community/PostDetails/PostDetails';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type CommentsProps = {
	params: Promise<{ postId: string }>;
};

export default async function Comments({ params }: CommentsProps) {
	const { postId } = await params;

	const post = await prisma.post.findFirst({
		where: {
			id: postId,
		},
	});

	if (!post) {
		notFound();
	}

	return <PostDetails id={postId} />;
}

export async function generateMetadata({
	params,
}: CommentsProps): Promise<Metadata> {
	const { postId } = await params;

	const post = await prisma.post.findFirst({
		where: {
			id: postId,
		},
	});

	return {
		title: post?.title,
	};
}
