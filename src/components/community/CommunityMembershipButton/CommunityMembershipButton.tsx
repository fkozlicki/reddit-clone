'use client';

import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import useChangeMembership from '@/hooks/mutation/useChangeMembership';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { ButtonHTMLAttributes, useState } from 'react';

interface CommunityMembershipButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	communityName: string;
	members: { id: string }[];
}

const CommunityMembershipButton = ({
	communityName,
	className,
	members,
}: CommunityMembershipButtonProps) => {
	const [, dispatch] = useModalsContext();
	const { data: session } = useSession();
	const [text, setText] = useState<string>('Joined');
	const [changeMembership, { loading: leaveLoading }] = useChangeMembership({
		variables: {
			name: communityName,
		},
		refetchQueries: ['Community'],
	});

	const isMember = members.some((member) => member.id === session?.user.id);

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
			className={cn('min-w-[75px]', className)}
		>
			{isMember ? text : 'Join'}
		</Button>
	);
};

export default CommunityMembershipButton;
