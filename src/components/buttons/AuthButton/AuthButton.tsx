import Image from 'next/image';
import React from 'react';

interface AuthButtonProps {
	image: any;
	text: string;
	onClick: () => void;
}

const AuthButton = ({ image, text, onClick }: AuthButtonProps) => {
	return (
		<button
			onClick={onClick}
			className="py-2 px-3 h-[40px] border border-post rounded-full flex gap-2 items-center bg-primary text-primary w-full"
		>
			<Image src={image} alt="" width={18} />
			<span className="text-sm font-medium m-auto">{text}</span>
		</button>
	);
};

export default AuthButton;
