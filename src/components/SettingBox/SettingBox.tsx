'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../inputs/Input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';

const settingsSchema = z.object({
	name: z.string().min(3),
	displayName: z.string().max(30).nullable(),
	about: z.string().max(200).nullable(),
});

type SettingsValues = z.infer<typeof settingsSchema>;

const UPDATE_USER_MUTATION = gql`
	mutation ($name: String, $displayName: String, $about: String) {
		updateUser(name: $name, displayName: $displayName, about: $about) {
			name
			displayName
			about
		}
	}
`;

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
	const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
		onCompleted(data) {
			toast('Changes saved', {
				icon: '✅',
			});
			setDefaultValue(data.updateUser[name]);
		},
	});

	const handleUpdate = (prop: keyof SettingsValues) => {
		if (defaultValue === watch(name)) {
			return;
		}

		handleSubmit((variables) => {
			updateUser({
				variables: {
					[name]: variables[prop],
				},
			});
		})();
	};

	const setValueAs = (value: any) => {
		return value === '' ? null : value;
	};

	return (
		<div>
			<div className="mb-2">{label}</div>
			<Input
				placeholder={label}
				register={register(name, {
					onBlur: () => handleUpdate(name),
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
					remainingCharacters === 0 ? 'text-danger' : 'text-text-gray'
				}`}
			>
				{remainingCharacters} characters remaining
			</div>
		</div>
	);
};

export default SettingBox;
