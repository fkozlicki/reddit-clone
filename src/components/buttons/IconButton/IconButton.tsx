import Link from 'next/link';
import React from 'react';

interface IconButtonProps {
	icon: JSX.Element;
	shape: 'circle' | 'square';
	href?: string;
	onClick?: () => void;
	text?: string;
	fontSize?: string;
	color?: string;
	selected?: boolean;
}

const IconButton = ({
	icon,
	text,
	shape,
	color,
	href,
	onClick,
	fontSize = 'text-sm',
	selected,
}: IconButtonProps) => {
	const shapeClass =
		shape === 'circle' ? 'px-2 py-[6px] rounded-full' : 'p-2 rounded';

	return href ? (
		<Link
			href={href}
			className={`flex items-center gap-1 bg-background-primary hover:bg-border-input ${shapeClass} ${
				color ? color : ''
			} ${selected ? 'bg-border-input text-primary' : ''}`}
		>
			{icon}
			{text && <span className={`${fontSize} font-bold`}>{text}</span>}
		</Link>
	) : (
		<button
			onClick={onClick}
			className={`flex items-center gap-1 bg-background-primary hover:bg-border-input ${shapeClass} ${
				color ? color : ''
			} ${selected ? 'bg-border-input text-primary' : ''}`}
		>
			{icon}
			{text && <span className={`${fontSize} font-bold`}>{text}</span>}
		</button>
	);
};

export default IconButton;
