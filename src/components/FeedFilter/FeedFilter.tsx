import Button from '@/components/ui/Button/Button';
import {
	BarsArrowUpIcon,
	BoltIcon,
	FireIcon,
	StarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface FeedFilterProps {
	highlighted: 'best' | 'hot' | 'new' | 'top';
	best?: boolean;
	prefix?: string;
}

const FeedFilter = ({ prefix, best, highlighted }: FeedFilterProps) => {
	return (
		<div className="bg-primary p-3 rounded border border-post mb-6">
			<div className="flex gap-2">
				{best && (
					<Link href={`${prefix ? `/${prefix}` : ''}/best`}>
						<Button
							icon={<StarIcon width={20} />}
							variant="secondary"
							className={highlighted === 'best' ? 'bg-gray-200' : ''}
						>
							Best
						</Button>
					</Link>
				)}
				<Link href={`${prefix ? `/${prefix}` : ''}/hot`}>
					<Button
						icon={<FireIcon width={20} />}
						variant="secondary"
						className={highlighted === 'hot' ? 'bg-gray-200' : ''}
					>
						Hot
					</Button>
				</Link>
				<Link href={`${prefix ? `/${prefix}` : ''}/new`}>
					<Button
						variant="secondary"
						icon={<BoltIcon width={20} />}
						className={highlighted === 'new' ? 'bg-gray-200' : ''}
					>
						New
					</Button>
				</Link>
				<Link href={`${prefix ? `/${prefix}` : ''}/top`}>
					<Button
						variant="secondary"
						icon={<BarsArrowUpIcon width={20} />}
						className={highlighted === 'top' ? 'bg-gray-200' : ''}
					>
						Top
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default FeedFilter;
