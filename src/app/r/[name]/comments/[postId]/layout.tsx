import React, { ReactNode } from 'react';

export default function CommentsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="bg-black/60">
			<div className="max-w-7xl m-auto sm:p-6 h-full flex bg-details min-h-[calc(100vh-48px)]">
				{children}
			</div>
		</div>
	);
}
