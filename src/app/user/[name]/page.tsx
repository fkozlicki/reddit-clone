import Feed from '@/components/Feed/Feed';
import FeedFilter from '@/components/FeedFilter/FeedFilter';
import Grid from '@/components/Grid/Grid';
import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';
import { gql } from '@apollo/client';
import { notFound } from 'next/navigation';
import React from 'react';

const USER_POSTS = (name: string) => gql`
	query($offset: Int, $limit: Int) {
		posts(offset: $offset, limit: $limit, filter: {author: {name: ${`"${name}"`}}}) {
			id
			title
			content
			createdAt
			comments {
				id
			}
			votes {
				userId
				value
			}
			author {
				name
			}
			community {
				name
			}
		}
	}
`;

const page = async ({ params: { name } }: { params: { name: string } }) => {
	const user = await prisma?.user.findUnique({
		where: {
			name,
		},
	});

	if (!user) {
		return notFound();
	}

	return (
		<div className="flex-1 bg-background-feed min-h-[calc(100vh-48px)]">
			<div className="bg-background-primary p-2">
				<div className="max-w-[976px] m-auto">{name} Profile</div>
			</div>
			<Grid
				left={<Feed query={USER_POSTS(name)} />}
				right={
					<div className="bg-background-primary p-3 rounded">
						<div>{user.name}</div>
						<div className="h-2" />
						<div className="text-xs text-text-gray">About:</div>
						{user.about && <div>{user.about}</div>}
						<div className="h-2" />
						<div className="text-xs text-text-gray">Joined:</div>
						<div>{calculateEllapsedTime(new Date(user.createdAt))}</div>
					</div>
				}
			/>
		</div>
	);
};

export default page;
