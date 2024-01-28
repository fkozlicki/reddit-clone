import { cn } from '@/lib/utils';
import clsx from 'clsx';
import React from 'react';

type StyleButtonProps = {
	onClick?: () => void;
	onToggle?: (style: string) => void;
	active?: boolean;
	className?: string;
	style?: string;
	label: string;
};

const StyleButton = (props: StyleButtonProps) => {
	const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement>) => {
		e.preventDefault();
		props?.onToggle!(props.style || '');
	};

	const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
		e.preventDefault();

		if (props?.onClick) {
			props.onClick();
		}
	};

	return (
		<span
			className={cn('px-1 text-gray-400', { 'text-black': props.active })}
			onMouseDown={handleMouseDown}
			onClick={handleClick}
		>
			{props.label}
		</span>
	);
};

export default StyleButton;
