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
	folder: string;
}

export async function uploadImageAction({ file, folder }: UploadImageParams) {
	const command = new PutObjectCommand({
		Bucket: process.env._AWS_BUCKET_NAME,
		Key: `${folder}/${file.name}`,
		ContentType: file.type,
		Body: Buffer.from(await file.arrayBuffer()),
	});

	await client.send(command);

	return `https://${process.env._AWS_BUCKET_NAME}.s3.eu-central-1.amazonaws.com/${folder}/${file.name}`;
}
