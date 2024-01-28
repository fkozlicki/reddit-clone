import React from 'react';
import StyleButton from './StyleButton';

const BLOCK_TYPES = [
	{ label: 'Heading', style: 'header-one' },
	{ label: 'Bullet List', style: 'unordered-list-item' },
	{ label: 'Number List', style: 'ordered-list-item' },
	{ label: 'Blockquote', style: 'blockquote' },
	{ label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props: any) => {
	const { editorState } = props;
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className="toolbar__controls">
			{BLOCK_TYPES.map((type) => (
				<StyleButton
					key={type.label}
					active={type.style === blockType}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
};

export default BlockStyleControls;
