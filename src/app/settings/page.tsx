import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import SettingBox from '@/components/SettingBox/SettingBox';
import UploadImage from '@/components/UploadImage/UploadImage';

const page = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/');
	}

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.id,
		},
	});

	if (!user) {
		return notFound();
	}

	const { name, displayName, about, image } = user;

	return (
		<div className="m-auto w-full">
			<div className="p-5 font-medium text-lg max-w-[1200px] m-auto border-b border-input mb-12 text-primary">
				User settings
			</div>
			<div className="max-w-[1200px] m-auto">
				<div className="max-w-[700px] mr-auto">
					<SettingBox
						initialValue={name}
						name="name"
						label="Name"
						maxLength={30}
					/>
					<div className="h-5" />
					<SettingBox
						initialValue={displayName}
						name="displayName"
						label="Display name (optional)"
						maxLength={30}
					/>
					<div className="h-5" />
					<SettingBox
						initialValue={about}
						name="about"
						label="About (optional)"
						textarea
						maxLength={200}
					/>
					<div className="h-5"></div>
					<UploadImage image={image} />
				</div>
			</div>
		</div>
	);
};

export default page;
