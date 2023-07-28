import Feed from '@/components/Feed/Feed';
import HomeCTA from '@/components/HomeCTA/HomeCTA';
import { gql } from '@apollo/client';
import React from 'react';

const TOP_POSTS_QUERY = (topicName: string) => gql`
	query ($offset: Int, $limit: Int) {
		posts(
			offset: $offset
			limit: $limit
			filter: { community: { topic: { name: ${`"${topicName}"`} } } }
		) {
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
	return (
		<div className="flex-1 bg-background-feed min-h-[calc(100vh-48px)]">
			<div className="flex gap-6 justify-center sm:px-6 pt-6">
				<div className="w-full lg:max-w-[640px]">
					<Feed query={TOP_POSTS_QUERY(name)} />
				</div>
				<div className="w-[312px] hidden lg:block flex-shrink-0">
					<HomeCTA />
				</div>
			</div>
		</div>
	);
};

export default page;
