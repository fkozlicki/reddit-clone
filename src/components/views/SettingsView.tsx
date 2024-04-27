'use client';

import useUpdateUser, {
	UpdateUserVariables,
} from '@/hooks/mutation/useUpdateUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import UploadImage from '../settings/UploadImage/UploadImage';
import Input from '../ui/Input/Input';
import Label from '../ui/Label/Label';
import Textarea from '../ui/Textarea/Textarea';

interface SettingsViewProps {
	user: User;
}

const settingsSchema = z.object({
	name: z.string().min(3),
	displayName: z.string().max(30).nullable(),
	about: z.string().max(200).nullable(),
	image: z.string().nullable(),
});

type SettingsValues = z.infer<typeof settingsSchema>;

const SettingsView = ({ user }: SettingsViewProps) => {
	const { register, handleSubmit, watch, getFieldState, reset } =
		useForm<SettingsValues>({
			defaultValues: user,
			resolver: zodResolver(settingsSchema),
		});
	const [updateUser] = useUpdateUser({
		onCompleted(data) {
			toast.success('Updated successfully');
			reset(data.updateUser);
		},
		onError() {
			toast.error('Something went wrong');
		},
	});

	const nameRemaining = 30 - watch('name').length;
	const displayNameRemaining = 30 - (watch('displayName')?.length ?? 0);
	const aboutRemaining = 200 - (watch('about')?.length ?? 0);

	const onUpdate = (key: keyof SettingsValues) => {
		if (!getFieldState(key).isDirty || getFieldState(key).error) {
			return;
		}

		handleSubmit((values) => {
			const variables = { [key]: values[key] } as UpdateUserVariables;

			updateUser({
				variables,
			});
		})();
	};

	const onUpload = (url: string) => {
		updateUser({
			variables: {
				image: url,
			},
		});
	};

	return (
		<div className="max-w-7xl m-auto px-4 py-6">
			<div className="font-medium text-lg border-b-2 border-input pb-2 mb-4 lg:mb-12 text-primary">
				User settings
			</div>
			<div className="max-w-2xl mr-auto flex flex-col gap-4 lg:gap-6">
				<div className="flex flex-col gap-1">
					<Label>Name</Label>
					<Input
						{...register('name', {
							onBlur() {
								onUpdate('name');
							},
						})}
						maxLength={30}
						remaining={nameRemaining}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<Label>Display name</Label>
					<Input
						{...register('displayName', {
							onBlur() {
								onUpdate('displayName');
							},
						})}
						placeholder="Display name"
						maxLength={30}
						remaining={displayNameRemaining}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<Label>About</Label>
					<Textarea
						{...register('about', {
							onBlur() {
								onUpdate('about');
							},
						})}
						className="min-h-[100px]"
						placeholder="About"
						maxLength={200}
						remaining={aboutRemaining}
					/>
				</div>
				<UploadImage
					image={watch('image')}
					folder={`/users/${user.id}`}
					onUpload={onUpload}
				/>
			</div>
		</div>
	);
};

export default SettingsView;
