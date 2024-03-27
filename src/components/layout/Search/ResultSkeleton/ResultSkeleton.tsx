import React from 'react';

const ResultSkeleton = () => {
	return (
		<div className="w-full p-2">
			<div className="h-2 bg-gray-300/70 rounded mb-2 max-w-[200px] animate-pulse" />
			<div className="h-4 bg-gray-300/70 rounded mb-4 max-w-md animate-pulse" />
		</div>
	);
};

export default ResultSkeleton;
