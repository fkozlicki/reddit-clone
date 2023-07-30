import CommentsSection from '@/components/CommentsSection/CommentsSection';
import CommunityAbout from '@/components/CommunityAbout/CommunityAbout';
import Post from '@/components/Post/Post';
import { notFound } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/prisma';

const getPost = async (id: string) => {
	const post = await prisma.post.findUnique({
		where: {
			id,
		},
		include: {
			author: true,
			comments: {
				include: {
					author: true,
					votes: true,
					replies: {
						include: {
							author: true,
							votes: true,
						},
					},
				},
				where: {
					replyTo: null,
				},
			},
			community: true,
			votes: true,
		},
	});

	return post;
};

const page = async ({ params: { id } }: { params: { id: string } }) => {
	const post = await getPost(id);

	if (!post) {
		return notFound();
	}

	return (
		<div className="flex-1 bg-black/50 min-h-[calc(100vh-48px)]">
			<div className="bg-background-feed max-w-[1300px] m-auto sm:p-6 min-h-full flex">
				<div className="flex gap-4 justify-center flex-1 min-h-full">
					<div className="w-full lg:max-w-[750px] flex flex-col">
						<Post
							id={post.id}
							title={post.title}
							authorName={post.author.name}
							communityName={post.community.name}
							createdAt={post.createdAt}
							content={post.content}
							comments={post.comments}
							votes={post.votes}
						/>
						<div className="w-full h-5" />
						<CommentsSection postId={post.id} initialComments={post.comments} />
					</div>
					<div className="w-[312px] hidden lg:block flex-shrink-0">
						<CommunityAbout withName cta="Join" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
