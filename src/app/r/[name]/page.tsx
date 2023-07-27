import CommunityAbout from '@/components/CommunityAbout/CommunityAbout';
import CommunityHeader from '@/components/CommunityHeader/CommunityHeader';
import FeedFilter from '@/components/FeedFilter/FeedFilter';
import Post from '@/components/Post/Post';
import { notFound } from 'next/navigation';
import React from 'react';

const page = async ({ params: { name } }: { params: { name: string } }) => {
	const community = await prisma?.community.findUnique({
		where: {
			name,
		},
		include: {
			topic: true,
			posts: {
				include: {
					author: true,
					votes: true,
					comments: true,
					community: true,
				},
			},
			members: true,
		},
	});

	if (!community) {
		return notFound();
	}

	return (
		<div className="flex-1 min-h-[calc(100vh-48px)] bg-background-feed">
			<CommunityHeader members={community.members} />
			<div className="pt-6">
				<div className="flex justify-center gap-6">
					<div className="w-full lg:w-auto lg:min-w-[640px]">
						<FeedFilter highlighted="hot" prefix={`r/${name}`} />
						{community.posts.map((post) => (
							<Post
								key={post.id}
								id={post.id}
								authorName={post.author.name}
								content={post.content}
								createdAt={post.createdAt}
								title={post.title}
								votes={post.votes}
								comments={post.comments}
								communityName={post.community.name}
							/>
						))}
					</div>
					<div className="w-[312px] hidden lg:block flex-shrink-0">
						<CommunityAbout withHeader editable cta="Create Post" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
