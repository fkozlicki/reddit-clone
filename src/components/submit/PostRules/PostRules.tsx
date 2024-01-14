import React, { Fragment } from 'react';

const PostRules = () => {
	return (
		<div className="bg-primary p-3 rounded border border-post">
			<div className="text-primary mb-4">Posting to Reddit</div>
			{rules.map((rule, index) => (
				<Fragment key={index}>
					<div className="text-sm mb-2 pt-2 text-primary">{rule}</div>
					{index !== rules.length - 1 && (
						<div className="w-full h-px border-b border-input my-2"></div>
					)}
				</Fragment>
			))}
		</div>
	);
};

export default PostRules;

const rules = [
	'1. Remember be the human',
	'2. Behave like you would in real life',
	'3. Look for the original source of content',
	'4. Search for duplicates before posting',
	"5. Read the community's rules",
];
