import HomeCTA from '@/components/HomeCTA/HomeCTA';
import Post from '@/components/Post/Post';
import React from 'react';

const page = async ({ params: { name } }: { params: { name: string } }) => {
	const posts = await prisma?.post.findMany({
		where: {
			community: {
				topic: {
					name,
				},
			},
		},
		include: {
			author: true,
			comments: {
				include: {
					replies: true,
				},
			},
			votes: true,
			community: true,
		},
	});

	return (
		<div className="flex-1 bg-background-feed min-h-[calc(100vh-48px)]">
			<div className="flex gap-6 justify-center sm:px-6 pt-6">
				<div className="w-full lg:max-w-[640px]">
					{posts && posts?.length > 0 ? (
						posts.map(
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
						)
					) : (
						<div className="bg-background-primary p-2 rounded">
							No posts in this topic yet.
						</div>
					)}
				</div>
				<div className="w-[312px] hidden lg:block flex-shrink-0">
					<HomeCTA />
				</div>
			</div>
		</div>
	);
};

export default page;
