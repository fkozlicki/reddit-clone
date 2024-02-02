import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';
import Button from '../Button/Button';

type StyleButtonProps = {
	onToggle?: (style: string) => void;
	active?: boolean;
	className?: string;
	style?: string;
	label: string;
	icon: ReactNode;
};

const StyleButton = ({
	label,
	active,
	onToggle,
	style,
	icon,
}: StyleButtonProps) => {
	const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
		e.preventDefault();
		onToggle!(style || '');
	};

	return (
		<Button
			shape="square"
			variant="text"
			className={cn('px-1 text-gray-400', { 'text-black': active })}
			onClick={handleClick}
		>
			{icon}
		</Button>
	);
};

export default StyleButton;
