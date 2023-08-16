import Link from 'next/link';
import React, { ButtonHTMLAttributes, MouseEventHandler } from 'react';

interface ButtonProps {
	children: JSX.Element | string;
	href?: string;
	classNames?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	filled?: boolean;
	color?: 'orange' | 'white';
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
	disabled?: boolean;
}

const Button = ({
	children,
	href,
	classNames,
	filled,
	color,
	onClick,
	type,
	disabled,
	onMouseEnter,
	onMouseLeave,
}: ButtonProps) => {
	const colorStyles = {
		orange: filled
			? 'bg-orange hover:bg-orange/90 text-white'
			: 'text-orange hover:bg-orange/[0.04] border-orange',
		white: 'text-black hover:bg-black/[0.04] border-none',
		primary: filled
			? 'bg-primary text-white hover:bg-primary/90'
			: 'text-primary hover:bg-primary/[0.04] border-primary',
	};

	const background = color ? colorStyles[color] : colorStyles['primary'];
	const border = filled ? '' : 'border';

	return href ? (
		<Link
			href={href}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`flex items-center justify-center ${border} ${background} px-4 py-1 rounded-full font-bold min-h-8 whitespace-nowrap w-full ${classNames}`}
		>
			{children}
		</Link>
	) : (
		<button
			disabled={disabled}
			type={type}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`${border} ${background} px-4 py-1 rounded-full text-sm font-bold min-h-8 whitespace-nowrap disabled:bg-gray-300 disabled:cursor-not-allowed flex justify-center items-center ${classNames}`}
		>
			{children}
		</button>
	);
};

export default Button;
