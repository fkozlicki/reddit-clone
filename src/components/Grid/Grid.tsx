import React, { type ReactNode } from 'react';

interface GridProps {
	left: ReactNode;
	right: ReactNode;
}

const Grid = ({ left, right }: GridProps) => {
	return (
		<div className="pt-6 sm:p-6">
			<div className="flex justify-center gap-6">
				<div className="w-full lg:max-w-[640px]">{left}</div>
				<div className="w-[312px] hidden lg:block flex-shrink-0">{right}</div>
			</div>
		</div>
	);
};

export default Grid;
