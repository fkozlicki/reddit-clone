import { cn } from '@/lib/utils';

export default function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('animate-pulse rounded-md bg-secondary', className)}
			{...props}
		/>
	);
}
