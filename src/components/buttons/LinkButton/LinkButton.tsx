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
			className="flex px-5 py-2 hover:bg-button-hover gap-2 w-full"
		>
			{icon}
			<span className="text-sm">{text}</span>
		</Link>
	) : (
		<button
			onClick={onClick}
			className="flex px-5 py-2 hover:bg-button-hover gap-2 w-full"
		>
			{icon}
			<span className="text-sm">{text}</span>
		</button>
	);
};

export default LinkButton;
