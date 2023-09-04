import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface AnimatedInputProps {
	label: string;
	register: UseFormRegisterReturn;
}

const AnimatedInput = ({ label, register }: AnimatedInputProps) => {
	return (
		<div className="relative mb-5">
			<input
				{...register}
				type="text"
				className="px-4 py-6 pb-2 rounded-full text-xs w-full bg-input border hover:post-hover outline-none peer leading-3 h-[44px]"
				placeholder=" "
			/>
			<div className="text-primary absolute top-1/2 left-4 -translate-y-[100%] text-xs peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-hover:-translate-y-[100%] peer-hover:text-xs peer-hover:font-normal peer-focus:-translate-y-[100%] peer-focus:text-xs peer-focus:font-normal pointer-events-none">
				{label}
			</div>
		</div>
	);
};

export default AnimatedInput;
