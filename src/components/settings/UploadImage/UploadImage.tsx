'use client';

import { CameraPlus } from '@phosphor-icons/react';
import { User } from '@prisma/client';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Image as ImageIcon } from '@phosphor-icons/react';
import { uploadImageAction } from '@/actions/upload-image-action';

interface UploadImageProps {
	image: User['image'];
	folder: string;
	onUpload: (url: string) => void;
}

const UploadImage = ({ image, folder, onUpload }: UploadImageProps) => {
	const { register } = useForm();
	const [loading, setLoading] = useState<boolean>(false);

	const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length <= 0) {
			return;
		}

		const file = event.target.files[0];
		const fileName = file.name;
		const fileType = file.type;

		setLoading(true);

		try {
			const url = await uploadImageAction({
				file,
				fileName,
				fileType,
				folder,
			});

			onUpload(url);
		} catch (error) {
			toast.error('Something went wrong');
		}

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
						<svg
							className="animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							width="1em"
							height="1em"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
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
