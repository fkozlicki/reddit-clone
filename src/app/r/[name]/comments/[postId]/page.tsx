import PostDetails from '@/components/community/PostDetails/PostDetails';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type CommentsProps = {
	params: { postId: string };
};

export default async function Comments({ params: { postId } }: CommentsProps) {
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
	params: { postId },
}: CommentsProps): Promise<Metadata> {
	const post = await prisma.post.findFirst({
		where: {
			id: postId,
		},
	});

	return {
		title: post?.title,
	};
}
