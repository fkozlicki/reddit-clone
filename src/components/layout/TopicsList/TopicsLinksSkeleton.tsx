import Skeleton from '@/components/ui/Skeleton';
import { Star } from '@phosphor-icons/react/dist/ssr';

export default function TopicsLinksSkeleton() {
	return (
		<div>
			{Array.from({ length: 5 }).map((el, index) => (
				<TopicItem key={index} />
			))}
		</div>
	);
}

function TopicItem() {
	return (
		<div className="flex gap-2 items-center px-3 h-6">
			<Star weight="fill" size={20} />
			<Skeleton className="w-3/4 h-4" />
		</div>
	);
}
