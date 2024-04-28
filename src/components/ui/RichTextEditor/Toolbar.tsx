import { cn } from '@/lib/utils';
import {
	Code,
	CodeBlock as CodeBlocIcon,
	ListBullets,
	ListNumbers,
	Quotes,
	TextB,
	TextH,
	TextItalic,
} from '@phosphor-icons/react';
import { Editor } from '@tiptap/react';
import Button from '../Button/Button';

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
					'text-primary': editor.isActive('codeBlock'),
				})}
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
			>
				<CodeBlocIcon size={20} />
			</Button>
		</div>
	);
};

export default Toolbar;
