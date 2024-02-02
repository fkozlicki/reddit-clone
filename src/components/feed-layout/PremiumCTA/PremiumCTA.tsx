import React from 'react';
import Button from '@/components/ui/Button/Button';

const PremiumCTA = () => {
	return (
		<div className="p-2 border border-post rounded bg-primary mb-6">
			<div className="text-[12px] mb-2">
				<div className="font-medium text-primary">Reddit Premium</div>
				<p className="text-primary">
					The best Reddit experience, with monthly Coins
				</p>
			</div>
			<Button
				variant="primary"
				className="w-full bg-orange hover:bg-orange-hover text-white"
			>
				Try Now
			</Button>
		</div>
	);
};

export default PremiumCTA;
