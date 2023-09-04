import Link from 'next/link';
import React from 'react';

interface IconButtonProps {
	icon: JSX.Element;
	shape: 'circle' | 'square';
	href?: string;
	onClick?: () => void;
	text?: string;
	selected?: boolean;
	classNames?: string;
}

const IconButton = ({
	icon,
	text,
	shape,
	href,
	onClick,
	selected,
	classNames,
}: IconButtonProps) => {
	const _shape =
		shape === 'circle' ? 'px-4 py-[6px] rounded-full' : 'p-2 rounded';
	const _selected = selected ? 'bg-primary-hover' : '';
	const className = `flex items-center gap-1 bg-primary hover:bg-primary-hover text-primary outline-none ${_shape} ${_selected} ${classNames}`;

	return href ? (
		<Link href={href} className={className}>
			{icon}
			{text && text}
		</Link>
	) : (
		<button onClick={onClick} className={className}>
			{icon}
			{text && text}
		</button>
	);
};

export default IconButton;
