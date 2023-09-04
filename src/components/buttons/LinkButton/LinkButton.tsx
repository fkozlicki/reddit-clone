import Link from 'next/link';
import React from 'react';

interface LinkButtonProps {
	text: string;
	icon?: JSX.Element;
	href?: string;
	onClick?: () => void;
}

const LinkButton = ({ href, icon, text, onClick }: LinkButtonProps) => {
	return href ? (
		<Link
			href={href}
			className="flex px-5 py-2 gap-2 w-full bg-primary hover:bg-primary-hover"
		>
			{icon}
			<span className="text-sm text-primary">{text}</span>
		</Link>
	) : (
		<button
			onClick={onClick}
			className="flex px-5 py-2 gap-2 w-full bg-primary hover:bg-primary-hover"
		>
			{icon}
			<span className="text-sm text-primary">{text}</span>
		</button>
	);
};

export default LinkButton;
