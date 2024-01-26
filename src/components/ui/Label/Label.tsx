import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React, { LabelHTMLAttributes } from 'react';

const label = cva('font-medium text-sm text-primary');

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ children, className, ...props }: LabelProps) => {
	return (
		<label className={cn(label(), className)} {...props}>
			{children}
		</label>
	);
};

export default Label;
