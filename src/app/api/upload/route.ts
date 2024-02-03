import S3 from 'aws-sdk/clients/s3';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PUT(req: NextRequest, res: NextResponse) {
	const session = getServerSession(authOptions);

	if (!session) {
		throw new Error('You have to be logged in');
	}

	const file = req.nextUrl.searchParams.get('file');
	const fileType = req.nextUrl.searchParams.get('fileType');
	const folder = req.nextUrl.searchParams.get('folder');

	try {
		const s3 = new S3({
			signatureVersion: 'v4',
			region: process.env._AWS_REGION,
			accessKeyId: process.env._AWS_ACCESS_KEY,
			secretAccessKey: process.env._AWS_SECRET_KEY,
		});

		const preSignedUrl = s3.getSignedUrl('putObject', {
			Bucket: `${process.env._AWS_BUCKET_NAME}${folder}`,
			Key: file,
			ContentType: fileType,
			Expires: 5 * 60,
		});

		return NextResponse.json({
			url: preSignedUrl,
		});
	} catch (error) {
		console.error(error);
	}
}
