'use client';

import { generateName } from '@/utils/randomNameGenerator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../buttons/Button/Button';
import { gql, useMutation } from '@apollo/client';

const changeNameSchema = z.object({
	name: z.string().min(1),
});

type ChangeNameValues = z.infer<typeof changeNameSchema>;

const changeNameMutation = gql`
	mutation ($name: String!) {
		updateUser(name: $name) {
			id
			name
		}
	}
`;

const ChangeNameForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ChangeNameValues>({
		resolver: zodResolver(changeNameSchema),
		defaultValues: {
			name: generateName(),
		},
	});
	// const { refresh } = useRouter();
	const [changeName] = useMutation(changeNameMutation, {
		onError: () => console.error('Couldnt update name'),
		onCompleted: () => window.location.reload(),
	});

	const onSubmit = ({ name }: ChangeNameValues) => {
		changeName({
			variables: {
				name,
			},
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="fixed top-5 right-5 p-3 bg-background-primary z-50 flex flex-col rounded"
		>
			<div className="mb-2 text-lg font-medium">
				Do you want to keep this username?
			</div>
			<div className="relative">
				<input
					{...register('name')}
					type="text"
					className="border border-primary rounded p-3 pl-6 w-full"
				/>
				<span className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-text-gray">
					u/
				</span>
			</div>
			<div className="py-2 text-xs text-danger">
				{errors.name && errors.name.message}
			</div>
			<Button text="Continue" filled type="submit" />
		</form>
	);
};

export default ChangeNameForm;
