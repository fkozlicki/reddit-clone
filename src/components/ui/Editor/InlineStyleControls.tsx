import React from 'react';
import StyleButton from './StyleButton';
import { TextItalic, Code, TextB } from '@phosphor-icons/react';
import { EditorState } from 'draft-js';

var INLINE_STYLES = [
	{ label: 'Bold', style: 'BOLD', icon: <TextB weight="bold" size={20} /> },
	{ label: 'Italic', style: 'ITALIC', icon: <TextItalic size={20} /> },
	{ label: 'Inline code', style: 'CODE', icon: <Code size={20} /> },
];

interface InlineStyleControlsProps {
	onToggle: (value: string) => void;
	editorState: EditorState;
}

const InlineStyleControls = ({
	editorState,
	onToggle,
}: InlineStyleControlsProps) => {
	const currentStyle = editorState.getCurrentInlineStyle();

	return (
		<div className="toolbar__controls">
			{INLINE_STYLES.map(({ icon, label, style }) => (
				<StyleButton
					key={label}
					active={currentStyle.has(style)}
					label={label}
					onToggle={onToggle}
					style={style}
					icon={icon}
				/>
			))}
		</div>
	);
};

export default InlineStyleControls;
