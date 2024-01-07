import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React, { HTMLAttributes, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const textField = cva(
	'border border-input bg-input rounded py-2 px-3 text-primary outline-none text-sm'
);

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	register?: UseFormRegisterReturn;
	remaining?: number;
}

const TextField = ({
	className,
	register,
	remaining,
	...props
}: TextFieldProps) => {
	return (
		<>
			<input
				type="text"
				className={cn(textField({ className }))}
				{...register}
				{...props}
			/>
			{typeof remaining === 'number' && (
				<div
					className={cn('text-xs mt-1', { 'text-red-600': remaining === 0 })}
				>
					{remaining} characters remaining
				</div>
			)}
		</>
	);
};

export default TextField;
