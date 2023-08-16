import React from 'react';

const PostRules = () => {
	return (
		<div className="bg-background-primary p-3 rounded border border-border-input">
			<div className="">Posting to Reddit</div>
			<div className="w-full h-px bg-border-input my-2"></div>
			{rules.map((rule, index) => (
				<div key={index}>
					<div className="text-sm mb-2 pt-2">{rule}</div>
					<div className="w-full h-px bg-border-input my-2"></div>
				</div>
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
