import Input from '@/components/ui/Input/Input';
import Modal from '@/components/ui/Modal/Modal';
import useCreateCommunity from '@/hooks/mutation/useCreateCommunity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import Label from '../../ui/Label/Label';

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
		defaultValues: {
			name: '',
		},
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

	const remaining = 21 - watch('name').length;

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
			okProps={{
				loading,
			}}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Label htmlFor="community-name">Name</Label>
				<Input
					id="community-name"
					placeholder="/r"
					className="text-sm w-full"
					maxLength={21}
					{...register('name')}
					remaining={remaining}
				/>
				{errors.name && (
					<div className="text-xs text-red-600">{errors.name.message}</div>
				)}
			</form>
		</Modal>
	);
};

export default CommunityModal;
