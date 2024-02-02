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
							variant="text"
							className={highlighted === 'best' ? 'bg-btn-text' : ''}
						>
							Best
						</Button>
					</Link>
				)}
				<Link href={`${prefix ? `/${prefix}` : ''}/hot`}>
					<Button
						icon={<FireIcon width={20} />}
						variant="text"
						className={highlighted === 'hot' ? 'bg-btn-text' : ''}
					>
						Hot
					</Button>
				</Link>
				<Link href={`${prefix ? `/${prefix}` : ''}/new`}>
					<Button
						variant="text"
						icon={<BoltIcon width={20} />}
						className={highlighted === 'new' ? 'bg-btn-text' : ''}
					>
						New
					</Button>
				</Link>
				<Link href={`${prefix ? `/${prefix}` : ''}/top`}>
					<Button
						variant="text"
						icon={<BarsArrowUpIcon width={20} />}
						className={highlighted === 'top' ? 'bg-btn-text' : ''}
					>
						Top
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default FeedFilter;
