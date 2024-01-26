'use client';

import Tab from '@/components/ui/Tab/Tab';
import { useSession } from 'next-auth/react';
import { useParams, usePathname } from 'next/navigation';

const ProfileNavigation = () => {
	const { name } = useParams();
	const pathname = usePathname();
	const { data: session } = useSession();

	return (
		<div className="bg-primary">
			<div className="max-w-[976px] m-auto">
				<div className="flex items-center h-10 gap-2 overflow-x-auto mobile-scrollbar">
					<Tab href={`/user/${name}`} selected={pathname === `/user/${name}`}>
						Overview
					</Tab>
					<Tab
						href={`/user/${name}/posts`}
						selected={pathname === `/user/${name}/posts`}
					>
						Posts
					</Tab>
					<Tab
						href={`/user/${name}/comments`}
						selected={pathname === `/user/${name}/comments`}
					>
						Comments
					</Tab>
					{name === session?.user.name && (
						<>
							<Tab
								href={`/user/${name}/saved`}
								selected={pathname === `/user/${name}/saved`}
							>
								Saved
							</Tab>
							<Tab
								href={`/user/${name}/upvoted`}
								selected={pathname === `/user/${name}/upvoted`}
							>
								Upvoted
							</Tab>
							<Tab
								href={`/user/${name}/downvoted`}
								selected={pathname === `/user/${name}/downvoted`}
							>
								Downvoted
							</Tab>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfileNavigation;
