import Image from 'next/image';
import React from 'react';

interface AuthButtonProps {
	image: any;
	text: string;
	width?: string;
	onClick: () => void;
}

const AuthButton = ({ image, text, width, onClick }: AuthButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`py-2 px-3 h-[40px] border border-border-post hover:bg-primary/[0.04] hover:border-primary/10 rounded-full flex gap-2 items-center ${
				width ?? 'w-full'
			}`}
		>
			<Image src={image} alt="" width={18} />
			<span className="text-sm font-medium m-auto">{text}</span>
		</button>
	);
};

export default AuthButton;
