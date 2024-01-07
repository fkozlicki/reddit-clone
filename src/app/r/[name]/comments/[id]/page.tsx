import PostDetails from '@/components/community/PostDetails/PostDetails';
import React from 'react';

export default function Comments({
	params: { id },
}: {
	params: { id: string };
}) {
	return (
		<div className="bg-black/60">
			<div className="max-w-7xl m-auto sm:p-6 h-full flex bg-details min-h-[calc(100vh-48px)]">
				<PostDetails id={id} />
			</div>
		</div>
	);
}
