'use client';

import { CameraPlus } from '@phosphor-icons/react';
import { User } from '@prisma/client';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoaderIcon, toast } from 'react-hot-toast';
import { Image as ImageIcon } from '@phosphor-icons/react';
import { uploadImageAction } from '@/actions/upload-image-action';

interface UploadImageProps {
	image: User['image'];
	folder: string;
	onUpload: (url: string) => void;
}

const UploadImage = ({ image, folder, onUpload }: UploadImageProps) => {
	const { register, reset, setValue } = useForm();
	const [loading, setLoading] = useState<boolean>(false);

	const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length <= 0) {
			return;
		}

		const file = event.target.files[0];

		setLoading(true);

		try {
			const url = await uploadImageAction({
				file,
				folder,
			});

			onUpload(url);
		} catch (error) {
			toast.error('Something went wrong');
		}

		setValue('image', undefined);
		setLoading(false);
	};

	return (
		<>
			<label className="w-32 h-32 relative block cursor-pointer border rounded overflow-hidden">
				{image ? (
					<Image src={image} alt="" width={128} height={128} priority={true} />
				) : (
					<div className="w-32 h-32 grid place-items-center text-primary">
						<ImageIcon size={72} weight="thin" className="opacity-80" />
					</div>
				)}
				<div className="absolute grid place-items-center right-2 bottom-2 rounded-full w-8 h-8 border border-primary">
					{loading ? (
						<LoaderIcon className="size-4 animate-spin" />
					) : (
						<CameraPlus size={20} className="text-primary" />
					)}
				</div>
				<input
					disabled={loading}
					type="file"
					accept="image/png, image/jpeg"
					className="hidden"
					{...register('image', {
						onChange: uploadImage,
					})}
				/>
			</label>
		</>
	);
};

export default UploadImage;
