import { cn } from '@/lib/utils';
import React, { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	remaining?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, remaining, ...props }, ref) => {
		return (
			<>
				<textarea
					ref={ref}
					className={cn(
						'border border-input bg-input rounded py-2 px-3 text-primary outline-none text-sm w-full no-scrollbar focus:border-post-hover',
						className
					)}
					{...props}
				/>{' '}
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

Textarea.displayName = 'Textarea';

export default Textarea;
