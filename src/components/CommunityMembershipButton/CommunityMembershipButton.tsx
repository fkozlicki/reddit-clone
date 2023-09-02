'use client';

import { gql, useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Button from '../buttons/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import Spinner from '../Spinner/Spinner';
import useCommunityMembers from '@/hooks/query/useCommunityMembers';

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

type CommunityMutationResponse = {
	name: string;
};
type CommunityMutationVariables = {
	name: string;
};

interface CommunityMembershipButtonProps {
	name: string;
	classNames?: string;
}

const CommunityMembershipButton = ({
	name,
	classNames,
}: CommunityMembershipButtonProps) => {
	const [, dispatch] = useModalsContext();
	const [isMember, setIsMember] = useState<boolean>(false);
	const { data: session } = useSession();
	const { data } = useCommunityMembers({
		variables: { name },
		onCompleted({ community: { members } }) {
			setIsMember(members.some(({ id }) => id === session?.user.id));
		},
	});
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

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	if (!data) {
		return null;
	}

	return isMember ? (
		<Button
			onMouseEnter={() => setText('Leave')}
			onMouseLeave={() => setText('Joined')}
			onClick={session ? () => leaveCommunity() : openSignIn}
			disabled={leaveLoading}
			classNames={classNames}
		>
			{leaveLoading ? <Spinner /> : text}
		</Button>
	) : (
		<Button
			filled
			disabled={joinLoading}
			onClick={session ? () => joinCommunity() : openSignIn}
			classNames={classNames}
		>
			{joinLoading ? <Spinner /> : 'Join'}
		</Button>
	);
};

export default CommunityMembershipButton;
