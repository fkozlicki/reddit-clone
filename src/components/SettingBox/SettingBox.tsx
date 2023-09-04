'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../inputs/Input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import useUpdateUser from '@/hooks/mutation/useUpdateUser';

const settingsSchema = z.object({
	name: z.string().min(3),
	displayName: z.string().max(30).nullable(),
	about: z.string().max(200).nullable(),
});

type SettingsValues = z.infer<typeof settingsSchema>;

interface SettingBoxProps {
	name: keyof SettingsValues;
	label: string;
	maxLength: number;
	initialValue: string | null;
	textarea?: boolean;
}

const SettingBox = ({
	name,
	maxLength,
	textarea,
	initialValue,
	label,
}: SettingBoxProps) => {
	const [defaultValue, setDefaultValue] = useState<string | null>(initialValue);
	const [remainingCharacters, setRemainingCharacters] = useState<number>(
		maxLength - (initialValue?.length ?? 0)
	);
	const { register, handleSubmit, watch } = useForm<SettingsValues>({
		resolver: zodResolver(settingsSchema),
		defaultValues: {
			[name]: initialValue,
		},
	});
	const [updateUser] = useUpdateUser({
		onCompleted(data) {
			toast('Changes saved', {
				icon: '✅',
			});
			setDefaultValue(data.updateUser[name]);
		},
	});

	const handleUpdate = () => {
		if (defaultValue === watch(name)) {
			return;
		}

		handleSubmit(({ name, displayName, about }) => {
			const variables =
				name === 'name'
					? {
							name,
					  }
					: name === 'displayName'
					? { displayName }
					: { about };

			updateUser({
				variables,
			});
		})();
	};

	const setValueAs = (value: any) => {
		return value === '' ? null : value;
	};

	return (
		<div>
			<div className="mb-2 text-primary">{label}</div>
			<Input
				placeholder={label}
				register={register(name, {
					onBlur: () => handleUpdate(),
					onChange: () => {
						setRemainingCharacters(maxLength - (watch(name)?.length ?? 0));
					},
					setValueAs,
				})}
				classNames="text-sm"
				maxLength={maxLength}
				textarea={textarea}
			/>
			<div className="h-3" />
			<div
				className={`text-xs ${
					remainingCharacters === 0 ? 'text-red-600' : 'text-primary'
				}`}
			>
				{remainingCharacters} characters remaining
			</div>
		</div>
	);
};

export default SettingBox;
