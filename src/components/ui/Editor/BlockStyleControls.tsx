import React from 'react';
import StyleButton from './StyleButton';
import {
	PiCodeBlockLight,
	PiListBullets,
	PiListNumbers,
	PiQuotes,
	PiTextH,
} from 'react-icons/pi';
import { EditorState } from 'draft-js';

const BLOCK_TYPES = [
	{ label: 'Heading', style: 'header-one', icon: <PiTextH size={20} /> },
	{
		label: 'Bullet List',
		style: 'unordered-list-item',
		icon: <PiListBullets size={20} />,
	},
	{
		label: 'Number List',
		style: 'ordered-list-item',
		icon: <PiListNumbers size={20} />,
	},
	{ label: 'Blockquote', style: 'blockquote', icon: <PiQuotes size={20} /> },
	{
		label: 'Code Block',
		style: 'code-block',
		icon: <PiCodeBlockLight size={20} />,
	},
];

interface BlockStyleControlsProps {
	onToggle: (value: string) => void;
	editorState: EditorState;
}

const BlockStyleControls = ({
	editorState,
	onToggle,
}: BlockStyleControlsProps) => {
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className="toolbar__controls">
			{BLOCK_TYPES.map(({ icon, label, style }) => (
				<StyleButton
					key={label}
					active={style === blockType}
					label={label}
					onToggle={onToggle}
					style={style}
					icon={icon}
				/>
			))}
		</div>
	);
};

export default BlockStyleControls;
