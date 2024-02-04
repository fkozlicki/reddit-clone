'use client';

import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import useChangeMembership from '@/hooks/mutation/useChangeMembership';
import { CommunityInfo } from '@/hooks/query/useCommunities';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { ButtonHTMLAttributes, useState } from 'react';

interface CommunityMembershipButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	community: CommunityInfo;
}

const CommunityMembershipButton = ({
	className,
	community,
}: CommunityMembershipButtonProps) => {
	const [, dispatch] = useModalsContext();
	const { data: session } = useSession();
	const [text, setText] = useState<string>('Joined');
	const [changeMembership] = useChangeMembership({
		variables: {
			name: community.name,
		},
		optimisticResponse: {
			changeMembership: {
				id: community.id,
				joined: !community.joined,
				membersCount: community.membersCount + (community.joined ? -1 : 1),
			},
		},
	});

	const onClick = () => {
		session ? changeMembership() : dispatch({ type: 'openSignIn' });
	};

	return (
		<Button
			onMouseEnter={() => setText('Leave')}
			onMouseLeave={() => setText('Joined')}
			onClick={onClick}
			className={cn('min-w-[75px]', className)}
		>
			{community.joined ? text : 'Join'}
		</Button>
	);
};

export default CommunityMembershipButton;
