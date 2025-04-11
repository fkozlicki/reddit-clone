'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
	region: process.env._AWS_REGION,
	credentials: {
		accessKeyId: process.env._AWS_ACCESS_KEY!,
		secretAccessKey: process.env._AWS_SECRET_KEY!,
	},
});

interface UploadImageParams {
	file: File;
	fileName: string;
	fileType: string;
	folder: string;
}

export async function uploadImageAction({
	file,
	fileName,
	folder,
	fileType,
}: UploadImageParams) {
	const command = new PutObjectCommand({
		Bucket: `${process.env._AWS_BUCKET_NAME}${folder}`,
		Key: fileName,
		ContentType: fileType,
		Body: file,
	});

	await client.send(command);

	return `https://${process.env._AWS_BUCKET_NAME}.s3.eu-central-1.amazonaws.com${folder}/${fileName}`;
}
