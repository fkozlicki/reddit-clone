import React from 'react';
import StyleButton from './StyleButton';
import { PiTextItalic, PiCode, PiTextBBold } from 'react-icons/pi';
import { EditorState } from 'draft-js';

var INLINE_STYLES = [
	{ label: 'Bold', style: 'BOLD', icon: <PiTextBBold size={20} /> },
	{ label: 'Italic', style: 'ITALIC', icon: <PiTextItalic size={20} /> },
	{ label: 'Inline code', style: 'CODE', icon: <PiCode size={20} /> },
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
