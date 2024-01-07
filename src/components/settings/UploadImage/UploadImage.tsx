'use client';

import useUpdateUser from '@/hooks/mutation/useUpdateUser';
import { CameraIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { User } from '@prisma/client';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface UploadImageProps {
	image: User['image'];
}

const UploadImage = ({ image }: UploadImageProps) => {
	const [profileImage, setProfileImage] = useState<User['image']>(image);
	const [updateUser] = useUpdateUser({
		onCompleted({ updateUser: { image } }) {
			toast('Changes saved');
			setProfileImage(image);
		},
		onError(error) {
			toast('Something went wrong');
			console.error(error);
		},
	});
	const { register } = useForm();

	const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length <= 0) {
			return;
		}

		const file = event.target.files[0];
		const filename = file.name;
		const filetype = file.type;

		try {
			const res = await fetch(
				`/api/upload?file=${filename}&fileType=${filetype}`,
				{
					method: 'PUT',
				}
			);

			const { url } = await (res.json() as Promise<{ url: string }>);

			await fetch(url, {
				method: 'PUT',
				body: file,
				headers: { 'Content-Type': filetype },
			});

			const s3FileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.eu-central-1.amazonaws.com/${filename}`;

			updateUser({
				variables: {
					image: s3FileUrl,
				},
			});
		} catch (error) {
			toast('Something went wrong');
			console.error(error);
		}
	};

	return (
		<div>
			<div className="mb-2 font-medium text-primary">Profile image</div>
			<label className="w-32 h-32 relative block cursor-pointer border rounded overflow-hidden">
				{profileImage ? (
					<Image
						src={profileImage}
						alt="profileImage"
						width={128}
						height={128}
						priority={true}
					/>
				) : (
					<div className="w-32 h-32 bg-black"></div>
				)}
				<div className="absolute grid place-items-center right-2 bottom-2 rounded-full w-8 h-8 border border-primary">
					<CameraIcon className="w-5 h-5 text-primary" />
				</div>
				<input
					type="file"
					accept="image/png, image/jpeg"
					className="hidden"
					{...register('image', {
						onChange: uploadImage,
					})}
				/>
			</label>
		</div>
	);
};

export default UploadImage;
