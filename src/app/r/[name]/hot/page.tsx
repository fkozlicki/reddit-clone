import CommunityScreen from '@/components/CommunityScreen/CommunityScreen';
import { gql } from '@apollo/client';
import { notFound } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/prisma';

const COMMUNITY_HOT_POSTS_QUERY = (communityName: string) => gql`
	query ($offset: Int, $limit: Int) {
		posts(
			offset: $offset
			limit: $limit
			filter: { community: { name: ${`"${communityName}"`} }  }
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
	});

	if (!community) {
		return notFound();
	}

	return (
		<CommunityScreen
			name={name}
			query={COMMUNITY_HOT_POSTS_QUERY(name)}
			highlighted="hot"
		/>
	);
};

export default page;
