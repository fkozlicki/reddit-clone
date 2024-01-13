import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

const button = cva(
	'border relative disabled:cursor-not-allowed font-medium outline-none',
	{
		variants: {
			variant: {
				default:
					'hover:bg-blue-50 hover:border-blue-100 disabled:hover:bg-gray-50 disabled:hover:border-gray-100',
				primary:
					'bg-blue-600/90 hover:bg-blue-600 text-white disabled:hover:bg-blue-400 disabled:hover:border-blue-400 border-0',
				secondary: 'hover:bg-gray-200 border-0',
			},
			size: {
				small: 'text-xs h-6 min-w-[24px] px-2',
				medium: 'py-1 px-3 text-sm h-8 min-w-[32px]',
				large: 'py-[10px] px-5 text-sm h-10 min-w-[40px]',
			},
			shape: {
				circle: 'rounded-full',
				square: 'rounded',
			},
		},
		defaultVariants: {
			variant: 'default',
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
	variant = 'default',
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
				className={cn('contents', {
					invisible: loading,
				})}
			>
				{icon && (
					<span
						className={cn('inline-block align-middle', {
							'mr-1': children,
						})}
					>
						{icon}
					</span>
				)}
				{children && (
					<span className="inline-block align-middle">{children}</span>
				)}
			</div>
			{loading && (
				<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<svg
						className="animate-spin"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						width="1em"
						height="1em"
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
