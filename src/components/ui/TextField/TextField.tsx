import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React, { HTMLAttributes, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const textField = cva(
	'border border-input bg-input rounded py-2 px-3 text-primary outline-none'
);

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	register?: UseFormRegisterReturn;
}

const TextField = ({ className, register, ...props }: TextFieldProps) => {
	return (
		<input
			type="text"
			className={cn(textField({ className }))}
			{...register}
			{...props}
		/>
	);
};

export default TextField;
