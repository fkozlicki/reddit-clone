'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Button from '../buttons/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import Spinner from '../Spinner/Spinner';
import useCommunityMembers from '@/hooks/query/useCommunityMembers';
import useChangeMembership from '@/hooks/mutation/useChangeMembership';

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
	const [text, setText] = useState<string>('Joined');
	const [changeMembership, { loading: leaveLoading }] = useChangeMembership({
		variables: {
			name,
		},
		onCompleted({ changeMembership: { members } }) {
			setIsMember(members.some((member) => member.id === session?.user.id));
		},
	});
	useCommunityMembers({
		variables: { name },
		onCompleted({ community: { members } }) {
			setIsMember(members.some(({ id }) => id === session?.user.id));
		},
	});

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	return (
		<Button
			onMouseEnter={() => setText('Leave')}
			onMouseLeave={() => setText('Joined')}
			onClick={session ? () => changeMembership() : openSignIn}
			disabled={leaveLoading}
			classNames={classNames}
		>
			{leaveLoading ? <Spinner /> : isMember ? text : 'Join'}
		</Button>
	);
};

export default CommunityMembershipButton;
