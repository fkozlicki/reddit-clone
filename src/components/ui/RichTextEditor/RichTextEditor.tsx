import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Button from '../Button/Button';
import { cn } from '@/lib/utils';
import {
	Code,
	CodeBlock,
	ListBullets,
	ListNumbers,
	Quotes,
	TextB,
	TextH,
	TextItalic,
} from '@phosphor-icons/react';

interface RichTextEditorProps {
	value: string;
	onChange: (value: string) => void;
}

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
		codeBlock: {
			HTMLAttributes: {
				class: 'bg-secondary p-4 rounded',
			},
		},
	}),
	Heading.configure({
		HTMLAttributes: {
			class: 'text-lg font-bold',
		},
	}),
];

const Toolbar = ({ editor }: { editor: Editor | null }) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="border border-input bg-transparent rounded-md rounded-b-none p-1 flex border-b-0">
			<Button
				type="button"
				shape="square"
				variant="text"
				className={cn('text-primary-light px-2', {
					'text-primary': editor.isActive('bold'),
				})}
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				<TextB size={20} weight="bold" />
			</Button>
			<Button
				type="button"
				shape="square"
				variant="text"
				className={cn('text-primary-light px-2', {
					'text-primary': editor.isActive('italic'),
				})}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				<TextItalic size={20} />
			</Button>
			<Button
				type="button"
				shape="square"
				variant="text"
				className={cn('text-primary-light px-2', {
					'text-primary': editor.isActive('code'),
				})}
				onClick={() => editor.chain().focus().toggleCode().run()}
			>
				<Code size={20} />
			</Button>
			<Button
				type="button"
				shape="square"
				variant="text"
				className={cn('text-primary-light px-2', {
					'text-primary': editor.isActive('heading', { level: 1 }),
				})}
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			>
				<TextH size={20} />
			</Button>
			<Button
				type="button"
				shape="square"
				variant="text"
				className={cn('text-primary-light px-2', {
					'text-primary': editor.isActive('bulletList'),
				})}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
			>
				<ListBullets size={20} />
			</Button>
			<Button
				type="button"
				shape="square"
				variant="text"
				className={cn('text-primary-light px-2', {
					'text-primary': editor.isActive('orderedList'),
				})}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<ListNumbers size={20} />
			</Button>
			<Button
				type="button"
				shape="square"
				variant="text"
				className={cn('text-primary-light px-2', {
					'text-primary': editor.isActive('blockquote'),
				})}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
			>
				<Quotes size={20} />
			</Button>
			<Button
				type="button"
				shape="square"
				variant="text"
				className={cn('text-primary-light px-2', {
					'text-primary': editor.isActive('codeblock'),
				})}
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
			>
				<CodeBlock size={20} />
			</Button>
		</div>
	);
};

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
