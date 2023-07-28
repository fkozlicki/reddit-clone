'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import Button from '../../buttons/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Input from '../../inputs/Input/Input';

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
	name: z.string().min(1).max(21),
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
		formState: { isValid },
	} = useForm<CreateCommunityValues>({
		resolver: zodResolver(createCommunitySchema),
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
			<div className="mb-4">Name</div>
			<Input placeholder="/r" register={register('name')} fontSize="text-sm" />
			<div className="flex items-center justify-end p-4 gap-2">
				<Button
					text="Cancel"
					width="w-auto"
					onClick={closeModal}
					type="button"
				/>
				<Button
					text="Create Community"
					filled
					width="w-auto"
					type="submit"
					disabled={!isValid || loading}
					loading={loading}
				/>
			</div>
		</form>
	);
};

export default CreateCommunityForm;
