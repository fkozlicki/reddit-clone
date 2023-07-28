import Spinner from '@/components/Spinner/Spinner';
import Link from 'next/link';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
	text: string;
	href?: string;
	onClick?: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	width?: string;
	filled?: boolean;
	color?: 'orange' | 'white';
	height?: string;
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
	disabled?: boolean;
	fontSize?: string;
	loading?: boolean;
}

const Button = ({
	width,
	text,
	filled,
	color,
	height,
	onClick,
	type,
	href,
	disabled,
	fontSize,
	loading,
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
			className={`${width ?? 'w-full'} flex items-center justify-center ${
				height ?? 'min-h-[32px]'
			} ${border} ${background} px-4 py-1 rounded-full ${
				fontSize ?? 'text-sm'
			} font-bold min-h-8 whitespace-nowrap`}
		>
			{text}
		</Link>
	) : (
		<button
			disabled={disabled}
			type={type}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`${width ?? 'w-full'} ${
				height ?? 'min-h-[32px]'
			} ${border} ${background} ${
				fontSize ?? 'text-sm'
			} px-4 py-1 rounded-full text-sm font-bold min-h-8 whitespace-nowrap disabled:bg-gray-300 disabled:cursor-not-allowed flex justify-center items-center`}
		>
			{loading ? <Spinner /> : text}
		</button>
	);
};

export default Button;
