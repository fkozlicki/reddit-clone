import PostDetails from '@/components/PostDetails/PostDetails';
import React from 'react';

export default function Comments({
	params: { id },
}: {
	params: { id: string };
}) {
	return (
		<div className="flex-1 bg-black/60 min-h-[calc(100vh-48px)]">
			<div className="max-w-[1300px] m-auto sm:p-6 min-h-full flex bg-details">
				<PostDetails id={id} />
			</div>
		</div>
	);
}
