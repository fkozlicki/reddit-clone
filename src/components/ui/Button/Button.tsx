import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import React, { HTMLAttributes, ReactNode } from 'react';

const button = cva(
	'border rounded-full relative disabled:cursor-not-allowed inline-flex items-center gap-1 justify-center',
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
				small: 'py-[2px] px-2 text-xs min-w-[18px]',
				medium: 'py-1 px-3 text-sm min-w-[24px]',
				large: 'py-2 px-5 min-w-[34px]',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'medium',
		},
	}
);

interface ButtonProps
	extends HTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof button> {
	loading?: boolean;
	disabled?: boolean;
	icon?: ReactNode;
}

const Button = ({
	className,
	variant,
	size,
	children,
	loading,
	disabled,
	icon,
	...props
}: ButtonProps) => {
	return (
		<button
			className={cn(button({ variant, size, className }), {
				'px-0': icon && !children,
			})}
			disabled={disabled}
			{...props}
		>
			{icon && icon}
			{children && (
				<span className={cn('', { invisible: loading })}>{children}</span>
			)}
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
							stroke-width="4"
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
