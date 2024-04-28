import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { createLowlight } from 'lowlight';
import CodeBlock from './CodeBlock';
import Toolbar from './Toolbar';

const lowlight = createLowlight();

lowlight.register({ javascript });
lowlight.register({ typescript });
lowlight.register({ css });
lowlight.register({ html });

const extensions = [
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: false,
			HTMLAttributes: {
				class: 'list-disc ml-4',
			},
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: false,
			HTMLAttributes: {
				class: 'list-decimal ml-4',
			},
		},
		code: {
			HTMLAttributes: {
				class: 'bg-secondary text-red-600 font-mono py-px px-1 text-xs rounded',
			},
		},
		blockquote: {
			HTMLAttributes: {
				class: 'pl-2 border-l-2 border-post',
			},
		},
		codeBlock: false,
	}),
	Heading.configure({
		HTMLAttributes: {
			class: 'text-xl font-bold',
		},
	}),
	Document,
	Paragraph,
	Text,
	CodeBlockLowlight.extend({
		addNodeView() {
			return ReactNodeViewRenderer(CodeBlock);
		},
	}).configure({
		lowlight,
	}),
];

interface RichTextEditorProps {
	value: string;
	onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
	const editor = useEditor({
		extensions,
		content: value,
		editorProps: {
			attributes: {
				class:
					'rounded border min-h-[150px] bg-input border-input px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 rounded-t-none',
			},
		},
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
	});

	return (
		<>
			<Toolbar editor={editor} />
			<EditorContent editor={editor} />
		</>
	);
};

export default RichTextEditor;
