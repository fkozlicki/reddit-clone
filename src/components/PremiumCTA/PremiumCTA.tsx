import React from 'react';
import Button from '../buttons/Button/Button';

const PremiumCTA = () => {
	return (
		<div className="p-2 border border-border-post rounded bg-background-primary mb-6">
			<div className="text-[12px] mb-2">
				<div className="font-medium">Reddit Premium</div>
				<p>The best Reddit experience, with monthly Coins</p>
			</div>
			<Button color="orange" filled classNames="w-full">
				Try Now
			</Button>
		</div>
	);
};

export default PremiumCTA;
