'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import SettingBox from '../SettingBox/SettingBox';

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

interface UserSettingsProps {
	name: string;
	displayName: string | null;
	about: string | null;
}

const UserSettings = ({ name, displayName, about }: UserSettingsProps) => {
	const [initialValues, setInitialValues] = useState({
		name,
		displayName,
		about,
	});
	const { register, handleSubmit, watch } = useForm<SettingsValues>({
		resolver: zodResolver(settingsSchema),
		defaultValues: {
			name,
			displayName,
			about,
		},
	});
	const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
		onCompleted(data) {
			toast('Changes saved', {
				icon: '✅',
			});
			setInitialValues(data.updateUser);
		},
	});

	const handleUpdate = (prop: keyof UserSettingsProps) => {
		if (initialValues[prop] === watch(prop)) {
			return;
		}

		handleSubmit((variables) => {
			updateUser({
				variables: {
					[prop]: variables[prop],
				},
			});
		})();
	};

	const setValueAs = (value: any) => {
		return value === '' ? null : value;
	};

	return (
		<div className="max-w-[700px] mr-auto">
			<SettingBox
				name="Name"
				register={register('name', {
					onBlur: () => handleUpdate('name'),
					setValueAs,
				})}
				remainingCharacters={30 - watch('name').length}
				maxLength={30}
			/>
			<div className="h-5" />
			<SettingBox
				name="Display name (optional)"
				register={register('displayName', {
					onBlur: () => handleUpdate('displayName'),
					setValueAs,
				})}
				remainingCharacters={30 - (watch('displayName')?.length ?? 0)}
				maxLength={30}
			/>
			<div className="h-5" />
			<SettingBox
				name="About (optional)"
				register={register('about', {
					onBlur: () => handleUpdate('about'),
					setValueAs,
				})}
				remainingCharacters={200 - (watch('about')?.length ?? 0)}
				textarea
				maxLength={200}
			/>
		</div>
	);
};

export default UserSettings;
