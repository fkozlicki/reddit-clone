import Link from 'next/link';
import JoinRedditButton from '../JoinRedditButton';
import TopicsList from '../TopicsList';

const Sidebar = () => {
	return (
		<div className="hidden xl:block fixed top-12 left-0">
			<div className="flex w-[270px] h-[calc(100vh-48px)] xl:flex flex-col bg-primary">
				<div className="flex-1">
					<div className="text-[10px] uppercase px-5 pb-1 pt-3 text-primary">
						feeds
					</div>
					<Link
						href="/"
						className="block text-sm px-5 py-2 hover:bg-btn-text text-primary"
					>
						Popular
					</Link>

					<TopicsList />
				</div>
				<div className="p-6">
					<p className="text-sm leading-[18px] pr-6 pb-5 text-primary">
						Create an account to follow your favorite communities and start
						taking part in conversations.
					</p>
					<JoinRedditButton />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
