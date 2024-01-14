import ChooseCommunity from '@/components/submit/ChooseCommunity/ChooseCommunity';
import PostRules from '@/components/submit/PostRules/PostRules';
import PostForm from '@/components/submit/PostForm/PostForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
	title: 'Submit to Reddit',
};

export default async function Submit() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/');
	}

	return (
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
	);
}
