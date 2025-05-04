import { Suspense } from 'react';
import TopicsLinks from './TopicsLinks';
import TopicsLinksSkeleton from './TopicsLinksSkeleton';

export default function TopicsList() {
	return (
		<div className="space-y-1">
			<p className="text-[10px] uppercase px-5 pt-3 text-primary">topics</p>
			<Suspense fallback={<TopicsLinksSkeleton />}>
				<TopicsLinks />
			</Suspense>
		</div>
	);
}
