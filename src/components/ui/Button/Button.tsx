import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode } from 'react';

const button = cva(
	'border relative disabled:cursor-not-allowed font-medium outline-none text-primary inline-flex items-center justify-center disabled:opacity-50',
	{
		variants: {
			variant: {
				outline: 'border-text-btn hover:bg-btn-text',
				primary:
					'bg-btn-primary hover:bg-btn-primary-hover text-primary-inverse border-0',
				text: 'hover:bg-btn-text border-0 disabled:hover:bg-transparent',
			},
			size: {
				small: 'text-xs h-6 min-w-[24px] px-2',
				medium: 'py-1 px-3 text-sm h-8 min-w-[32px]',
				large: 'py-[10px] px-5 text-sm h-[38px] min-w-[38px]',
			},
			shape: {
				circle: 'rounded-full',
				square: 'rounded',
			},
		},
		defaultVariants: {
			variant: 'outline',
			size: 'medium',
			shape: 'circle',
		},
	}
);

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof button> {
	loading?: boolean;
	disabled?: boolean;
	icon?: ReactNode;
}

const Button = ({
	className,
	variant = 'outline',
	size = 'medium',
	shape = 'circle',
	children,
	loading,
	disabled,
	icon,
	...props
}: ButtonProps) => {
	return (
		<button
			className={cn(
				button({ variant, size, shape }),
				{ 'px-0': !children },
				className
			)}
			disabled={disabled}
			{...props}
		>
			<div
				className={cn('flex items-center gap-1', {
					invisible: loading,
				})}
			>
				{icon && <span>{icon}</span>}
				{children && <span>{children}</span>}
			</div>
			{loading && (
				<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<svg
						className="animate-spin"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						width="1.2em"
						height="1.2em"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				</span>
			)}
		</button>
	);
};

export default Button;
