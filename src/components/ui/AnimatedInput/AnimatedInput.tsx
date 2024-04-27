import { cn } from '@/lib/utils';
import React, { InputHTMLAttributes, forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
	({ label, className }, ref) => {
		return (
			<div className="relative mb-5">
				<input
					ref={ref}
					type="text"
					className={cn(
						'px-4 py-6 pb-2 rounded-full text-xs w-full bg-input border hover:post-hover outline-none peer leading-3 h-[44px]',
						className
					)}
					placeholder=" "
				/>
				<div className="text-primary absolute top-1/2 left-4 -translate-y-[100%] text-xs peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-hover:-translate-y-[100%] peer-hover:text-xs peer-hover:font-normal peer-focus:-translate-y-[100%] peer-focus:text-xs peer-focus:font-normal pointer-events-none">
					{label}
				</div>
			</div>
		);
	}
);
AnimatedInput.displayName = 'AnimatedInput';

export default AnimatedInput;
