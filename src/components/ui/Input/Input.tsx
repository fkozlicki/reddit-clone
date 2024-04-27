import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	remaining?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ remaining, className, ...props }, ref) => {
		return (
			<>
				<input
					type="text"
					ref={ref}
					className={cn(
						'border border-input bg-input rounded py-2 px-3 text-primary outline-none text-sm w-full focus:border-post-hover',
						className
					)}
					{...props}
				/>
				{typeof remaining === 'number' && (
					<div
						className={cn('text-xs mt-1 text-primary', {
							'text-red-600': remaining === 0,
						})}
					>
						{remaining} characters remaining
					</div>
				)}
			</>
		);
	}
);

Input.displayName = 'DisplayName';

export default Input;
