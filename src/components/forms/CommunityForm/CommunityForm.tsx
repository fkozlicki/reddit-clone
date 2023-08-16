'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import Button from '../../buttons/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Input from '../../inputs/Input/Input';
import Spinner from '@/components/Spinner/Spinner';

interface CreateCommunityFormProps {
	closeModal: () => void;
}

export const CreateCommunityMutation = gql`
	mutation ($name: String!) {
		createCommunity(name: $name) {
			name
		}
	}
`;

const createCommunitySchema = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Name must be minimum 3 characters long',
		})
		.max(21, { message: 'Name must be maximum 21 characters long' })
		.regex(/^[a-zA-Z0-9_-]+$/, { message: 'Invalid name' }),
});

type CreateCommunityValues = z.infer<typeof createCommunitySchema>;
type CreateCommunityResponse = {
	createCommunity: {
		name: string;
	};
};

const CreateCommunityForm = ({ closeModal }: CreateCommunityFormProps) => {
	const { push } = useRouter();
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
		watch,
	} = useForm<CreateCommunityValues>({
		resolver: zodResolver(createCommunitySchema),
		defaultValues: {
			name: '',
		},
		reValidateMode: 'onChange',
		mode: 'onSubmit',
	});
	const [createCommunity, { loading }] = useMutation<
		CreateCommunityResponse,
		CreateCommunityValues
	>(CreateCommunityMutation, {
		onCompleted: ({ createCommunity: { name } }) => {
			toast('Community created successfuly', {
				icon: '✅',
			});
			reset();
			closeModal();
			push(`/r/${name}`);
		},
		onError: (err) => console.error(err),
	});
	const [remainingCharacters, setRemainingCharacters] = useState<number>(21);

	const onSubmit = (values: CreateCommunityValues) => {
		createCommunity({
			variables: values,
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="p-3 w-[400px] bg-background-primary rounded"
		>
			<div className="flex justify-between items-center mb-8">
				<div className="font-medium">Create a community</div>
				<button onClick={closeModal}>
					<XMarkIcon width={20} />
				</button>
			</div>
			<div className="mb-4 font-medium">Name</div>
			<Input
				placeholder="/r"
				register={register('name', {
					onChange() {
						setRemainingCharacters(21 - watch('name').length);
					},
				})}
				classNames="text-sm"
				maxLength={21}
			/>
			<div className="h-2" />
			<div
				className={`text-xs ${
					remainingCharacters === 0 ? 'text-danger' : 'text-text-gray'
				}`}
			>
				{remainingCharacters} remaining characters
			</div>
			<div className="h-1" />
			{errors.name && (
				<div className="text-xs text-danger">{errors.name.message}</div>
			)}
			<div className="flex items-center justify-end p-4 gap-2">
				<Button onClick={closeModal} type="button" classNames="w-auto">
					Cancel
				</Button>
				<Button filled classNames="w-auto" type="submit" disabled={loading}>
					{loading ? <Spinner /> : 'Create Community'}
				</Button>
			</div>
		</form>
	);
};

export default CreateCommunityForm;
