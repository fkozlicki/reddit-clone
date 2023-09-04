'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

const Search = () => {
	const [focus, setFocus] = useState<boolean>(false);

	const roundedBottom = focus ? 'rounded-b-none' : '';
	const border = focus ? 'border-button' : 'border-input';

	return (
		<div className="relative">
			<div
				className={`bg-input w-full flex h-10 border rounded-3xl hover:border-button pl-[15px] ${roundedBottom} ${border}`}
			>
				<MagnifyingGlassIcon width={24} className="text-gray-500 mr-2" />
				<input
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					type="text"
					placeholder="Search Reddit"
					className="placeholder:text-sm placeholder:text-gray-600 bg-transparent outline-none text-sm w-full"
				/>
			</div>
		</div>
	);
};

export default Search;
