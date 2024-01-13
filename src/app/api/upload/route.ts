import S3 from 'aws-sdk/clients/s3';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, res: NextResponse) {
	const file = req.nextUrl.searchParams.get('file');
	const fileType = req.nextUrl.searchParams.get('fileType');

	try {
		const s3 = new S3({
			signatureVersion: 'v4',
			region: process.env.AWS_REGION,
			accessKeyId: process.env.AWS_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SECRET_KEY,
		});

		const preSignedUrl = s3.getSignedUrl('putObject', {
			Bucket: process.env.AWS_BUCKET_NAME,
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
