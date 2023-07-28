'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Button from '../buttons/Button/Button';

const JOIN_COMMUNITY_MUTATION = gql`
	mutation ($name: String!) {
		joinCommunity(name: $name) {
			id
		}
	}
`;

const LEAVE_COMMUNITY_MUTATION = gql`
	mutation ($name: String!) {
		leaveCommunity(name: $name) {
			id
		}
	}
`;

const COMMUNITY_QUERY = gql`
	query ($name: String!) {
		community(name: $name) {
			members {
				id
			}
		}
	}
`;

type CommunityMutationResponse = {
	name: string;
};
type CommunityMutationVariables = {
	name: string;
};

type CommunityQueryResponse = {
	community: {
		members: User[];
	};
};
type CommunityQueryVariables = {
	name: string;
};

interface CommunityMembershipButtonProps {
	name: string;
	width?: string;
}

const CommunityMembershipButton = ({
	name,
	width,
}: CommunityMembershipButtonProps) => {
	const [isMember, setIsMember] = useState<boolean>(false);
	const { data: session } = useSession();
	const { data } = useQuery<CommunityQueryResponse, CommunityQueryVariables>(
		COMMUNITY_QUERY,
		{
			variables: { name },
			onCompleted({ community: { members } }) {
				setIsMember(members.some(({ id }) => id === session?.user.id));
			},
		}
	);
	const [text, setText] = useState<string>('Joined');
	const [leaveCommunity, { loading: leaveLoading }] = useMutation<
		CommunityMutationResponse,
		CommunityMutationVariables
	>(LEAVE_COMMUNITY_MUTATION, {
		variables: {
			name,
		},
		onCompleted() {
			setIsMember(false);
		},
	});
	const [joinCommunity, { loading: joinLoading }] = useMutation<
		CommunityMutationResponse,
		CommunityMutationVariables
	>(JOIN_COMMUNITY_MUTATION, {
		variables: {
			name,
		},
		onCompleted() {
			setIsMember(true);
		},
	});

	if (!data) {
		return null;
	}

	return isMember ? (
		<Button
			onMouseEnter={() => setText('Leave')}
			onMouseLeave={() => setText('Joined')}
			text={text}
			width={width ?? 'w-24'}
			onClick={() => leaveCommunity()}
			loading={leaveLoading}
			disabled={leaveLoading}
		/>
	) : (
		<Button
			text="Join"
			filled
			width={width ?? 'w-24'}
			loading={joinLoading}
			disabled={joinLoading}
			onClick={() => joinCommunity()}
		/>
	);
};

export default CommunityMembershipButton;
