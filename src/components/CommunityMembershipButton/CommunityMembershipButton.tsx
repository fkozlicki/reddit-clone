'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import useCommunityMembers from '@/hooks/query/useCommunityMembers';
import useChangeMembership from '@/hooks/mutation/useChangeMembership';
import { cn } from '@/lib/utils';

interface CommunityMembershipButtonProps {
	name: string;
	wide?: boolean;
}

const CommunityMembershipButton = ({
	name,
	wide,
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
			loading={leaveLoading}
			className={cn({ 'w-full': wide })}
		>
			{isMember ? text : 'Join'}
		</Button>
	);
};

export default CommunityMembershipButton;
