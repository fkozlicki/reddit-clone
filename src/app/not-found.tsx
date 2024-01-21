import React from 'react';

const NotFound = () => {
	return (
		<div className="h-[calc(100vh-4rem)] flex justify-center items-center">
			<div className="text-2xl font-bold border-r border-black pr-4 mr-4">
				404
			</div>
			<div className="text-lg">Resource not found</div>
		</div>
	);
};

export default NotFound;
