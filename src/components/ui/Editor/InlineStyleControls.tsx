import React from 'react';
import StyleButton from './StyleButton';

var INLINE_STYLES = [
	{ label: 'Bold', style: 'BOLD' },
	{ label: 'Italic', style: 'ITALIC' },
	{ label: 'Inline code', style: 'CODE' },
];

const InlineStyleControls = (props: any) => {
	const currentStyle = props.editorState.getCurrentInlineStyle();

	return (
		<div className="toolbar__controls">
			{INLINE_STYLES.map((type) => (
				<StyleButton
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
};

export default InlineStyleControls;
