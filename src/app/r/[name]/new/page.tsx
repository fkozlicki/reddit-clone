import CommunityScreen from '@/components/CommunityScreen/CommunityScreen';
import { gql } from '@apollo/client';
import { notFound } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/prisma';

const COMMUNITY_NEW_POSTS_QUERY = (communityName: string) => gql`
	query ($offset: Int, $limit: Int) {
		posts(
			offset: $offset
			limit: $limit
			filter: { community: { name: ${`"${communityName}"`} } }
			sort: new
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
	const community = await prisma.community.findUnique({
		where: {
			name,
		},
		include: {
			members: true,
		},
	});

	if (!community) {
		return notFound();
	}

	return (
		<CommunityScreen
			name={name}
			query={COMMUNITY_NEW_POSTS_QUERY(name)}
			highlighted="new"
		/>
	);
};

export default page;
