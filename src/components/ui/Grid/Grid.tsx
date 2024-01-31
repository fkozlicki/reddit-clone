import React, { type ReactNode } from 'react';

interface GridProps {
	left: ReactNode;
	right: ReactNode;
}

const Grid = ({ left, right }: GridProps) => {
	return (
		<div className="flex gap-6 max-w-[976px] m-auto w-full">
			<div className="flex-1">{left}</div>
			<div className="w-[312px] hidden lg:block flex-shrink-0">{right}</div>
		</div>
	);
};

export default Grid;
