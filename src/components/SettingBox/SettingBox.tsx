import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Input from '../inputs/Input/Input';

interface SettingBoxProps {
	name: string;
	register: UseFormRegisterReturn;
	maxLength: number;
	remainingCharacters: number;
	textarea?: boolean;
}

const SettingBox = ({
	name,
	register,
	maxLength,
	remainingCharacters,
	textarea,
}: SettingBoxProps) => {
	return (
		<div>
			<div className="mb-2">{name}</div>
			<Input
				placeholder={name}
				register={register}
				fontSize="text-sm"
				maxLength={maxLength}
				textarea={textarea}
			/>
			<div className="h-3" />
			<div
				className={`text-xs ${
					remainingCharacters === 0 ? 'text-danger' : 'text-text-gray'
				}`}
			>
				{remainingCharacters} characters remaining
			</div>
		</div>
	);
};

export default SettingBox;
