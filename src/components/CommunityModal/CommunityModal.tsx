import React, { useState } from 'react';
import Modal from '@/components/ui/Modal/Modal';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import useCreateCommunity from '@/hooks/mutation/useCreateCommunity';
import TextField from '@/components/ui/TextField/TextField';

interface CommunityModalProps {
	open: boolean;
	onClose: () => void;
}

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

const CommunityModal = ({ open, onClose }: CommunityModalProps) => {
	const { push } = useRouter();
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
		watch,
	} = useForm<CreateCommunityValues>({
		resolver: zodResolver(createCommunitySchema),
		reValidateMode: 'onChange',
		mode: 'onSubmit',
	});
	const [createCommunity, { loading }] = useCreateCommunity({
		onCompleted: ({ createCommunity: { name } }) => {
			toast.success('Community created successfully');
			reset();
			onClose();
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
		<Modal
			open={open}
			onClose={onClose}
			onOk={handleSubmit(onSubmit)}
			title="Create community"
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-1 font-medium text-primary">Name</div>
				<TextField
					placeholder="/r"
					className="text-sm w-full"
					maxLength={21}
					register={register('name', {
						onChange() {
							setRemainingCharacters(21 - watch('name').length);
						},
					})}
				/>
				<div
					className={`text-xs mt-2 ${
						remainingCharacters === 0 ? 'text-red-600' : 'text-primary'
					}`}
				>
					{remainingCharacters} remaining characters
				</div>
				<div className="h-1" />
				{errors.name && (
					<div className="text-xs text-red-600">{errors.name.message}</div>
				)}
			</form>
		</Modal>
	);
};

export default CommunityModal;
