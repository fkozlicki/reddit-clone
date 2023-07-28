import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
	register: UseFormRegisterReturn;
	placeholder: string;
	textarea?: boolean;
	fontSize?: string;
	border?: 'gray' | 'primary';
}

const Input = ({
	textarea,
	register,
	placeholder,
	fontSize,
	border = 'gray',
}: InputProps) => {
	const _border =
		border === 'primary'
			? 'border-primary'
			: 'border-border-input focus:border-black';

	return textarea ? (
		<textarea
			{...register}
			placeholder={placeholder}
			className={`w-full resize-y outline-none border ${_border} rounded py-2 px-3 min-h-[150px] ${
				fontSize ?? ''
			}`}
		></textarea>
	) : (
		<input
			{...register}
			type="text"
			className={`w-full outline-none border ${_border} rounded py-2 px-3 ${
				fontSize ?? ''
			}`}
			placeholder={placeholder}
		/>
	);
};

export default Input;
