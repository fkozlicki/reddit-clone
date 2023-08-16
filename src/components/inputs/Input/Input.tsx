import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
	register: UseFormRegisterReturn;
	placeholder: string;
	textarea?: boolean;
	maxLength?: number;
	classNames?: string;
}

const Input = ({
	textarea,
	register,
	placeholder,
	maxLength,
	classNames,
}: InputProps) => {
	return textarea ? (
		<textarea
			{...register}
			placeholder={placeholder}
			className={`w-full resize-y outline-none border border-border-input focus:border-black rounded py-2 px-3 min-h-[150px] ${classNames}`}
			maxLength={maxLength}
		></textarea>
	) : (
		<input
			{...register}
			type="text"
			className={`w-full outline-none border border-border-input focus:border-black rounded py-2 px-3 ${classNames}`}
			placeholder={placeholder}
			maxLength={maxLength}
		/>
	);
};

export default Input;
