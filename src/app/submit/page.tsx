import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import ChooseCommunity from '@/components/ChooseCommunity/ChooseCommunity';
import PostForm from '@/components/forms/PostForm/PostForm';
import PostRules from '@/components/PostRules/PostRules';

export default async function Submit() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/');
	}

	return (
		<div className="flex-1 min-h-[calc(100vh-48px)] ">
			<div className="flex justify-center gap-6 pt-6">
				<div className="w-full lg:w-auto lg:min-w-[640px]">
					<div className="mb-4 font-medium text-primary">Create a post</div>
					<div className="w-full h-px bg-primary my-4" />
					<ChooseCommunity />
					<PostForm />
				</div>
				<div className="w-[312px] hidden lg:block flex-shrink-0">
					<PostRules />
				</div>
			</div>
		</div>
	);
}
