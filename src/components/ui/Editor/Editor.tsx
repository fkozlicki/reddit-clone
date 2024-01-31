import { Editor as DraftJsEditor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';
import { useEffect, useState } from 'react';
import BlockStyleControls from './BlockStyleControls';
import './Editor.css';
import InlineStyleControls from './InlineStyleControls';

interface EditorProps {
	onChange: (value: string) => void;
}

const Editor = ({ onChange }: EditorProps) => {
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	useEffect(() => {
		onChange(stateToHTML(editorState.getCurrentContent()));
	}, [editorState]);

	const toggleBlockType = (blockType: string) => {
		setEditorState(RichUtils.toggleBlockType(editorState, blockType));
	};

	const toggleInlineStyle = (inlineStyle: string) => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	};

	const styleMap = {
		CODE: {
			background: 'var(--color-bg-secondary)',
			padding: '1px 4px',
			fontFamily: 'monospace',
			color: 'red',
			fontSize: 11,
			borderRadius: 3,
		},
	};

	return (
		<div className="border border-input rounded bg-input text-primary">
			<div className="flex p-1 bg-primary">
				<InlineStyleControls
					editorState={editorState}
					onToggle={toggleInlineStyle}
				/>
				<div className="w-px h-auto mx-1 my-1 border-r border-post" />
				<BlockStyleControls
					editorState={editorState}
					onToggle={toggleBlockType}
				/>
			</div>
			<DraftJsEditor
				editorState={editorState}
				onChange={setEditorState}
				placeholder="Text (optional)"
				customStyleMap={styleMap}
			/>
		</div>
	);
};

export default Editor;
