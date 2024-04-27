import UploadImage from '@/components/settings/UploadImage/UploadImage';
import Avatar from '@/components/ui/Avatar/Avatar';
import Input from '@/components/ui/Input/Input';
import Label from '@/components/ui/Label/Label';
import Modal from '@/components/ui/Modal/Modal';
import useUpdateCommunity from '@/hooks/mutation/useUpdateCommunity';
import { CommunityData } from '@/hooks/query/useCommunity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface CommunitySettingsModalProps {
	open: boolean;
	onClose: () => void;
	community: CommunityData;
}

const updateCommunitySchema = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Name must be minimum 3 characters long',
		})
		.max(21, { message: 'Name must be maximum 21 characters long' })
		.regex(/^[a-zA-Z0-9_-]+$/, { message: 'Invalid name' }),
});

type UpdateCommunityValues = z.infer<typeof updateCommunitySchema>;

const CommunitySettingsModal = ({
	open,
	onClose,
	community,
}: CommunitySettingsModalProps) => {
	const { push } = useRouter();
	const { register, handleSubmit } = useForm<UpdateCommunityValues>({
		resolver: zodResolver(updateCommunitySchema),
		defaultValues: community,
	});
	const [updateCommunity, { loading }] = useUpdateCommunity({
		onCompleted() {
			toast.success('Updated community');
			onClose();
		},
		onError() {
			toast.error("Couldn't update");
		},
		refetchQueries: ['Community'],
	});

	const onUpload = (url: string) => {
		updateCommunity({
			variables: {
				id: community.id,
				image: url,
			},
		});
	};

	const onSave = () => {
		handleSubmit(({ name }) => {
			updateCommunity({
				variables: {
					id: community.id,
					name,
				},
				onCompleted(data) {
					push(`/r/${data.updateCommunity.name}`);
				},
			});
		})();
	};

	return (
		<Modal
			okProps={{
				text: 'Save',
				disabled: loading,
				loading,
			}}
			title="Community settings"
			open={open}
			onClose={onClose}
			onOk={onSave}
		>
			<form>
				<Label className="mb-2 inline-block">Name</Label>
				<Input {...register('name')} className="mb-4" />
				<Label className="mb-2 inline-block">Image</Label>
				<UploadImage
					folder={`/communities/${community.id}`}
					image={community.image}
					onUpload={onUpload}
				/>
				<div className="h-4" />
				<Label className="mb-2 inline-block">Moderators</Label>
				<div className="w-full flex flex-col gap-2 max-h-48 overflow-auto">
					{community.moderators.map((user) => (
						<div key={user.id} className="flex gap-2 p-2 bg-input rounded">
							<Avatar size={32} url={user.image} alt="" />
							<div className="text-sm text-primary">{user.name}</div>
						</div>
					))}
				</div>
			</form>
		</Modal>
	);
};

export default CommunitySettingsModal;
