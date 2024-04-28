import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React from 'react';
import 'highlight.js/styles/atom-one-dark.css';

interface CodeBlockProps {
	node: {
		attrs: Record<string, string>;
	};
	updateAttributes: (args: Record<string, string>) => void;
	extension: {
		options: {
			lowlight: {
				listLanguages: () => string[];
			};
		};
	};
}

const CodeBlock = ({
	node: {
		attrs: { language: defaultLanguage },
	},
	updateAttributes,
	extension,
}: CodeBlockProps) => {
	return (
		<NodeViewWrapper className="relative">
			<select
				className="absolute right-1 top-1 bg-input outline-none"
				contentEditable={false}
				defaultValue={defaultLanguage}
				onChange={(event) => updateAttributes({ language: event.target.value })}
			>
				<option value="null">auto</option>
				<option disabled>—</option>
				{extension.options.lowlight.listLanguages().map((lang, index) => (
					<option key={index} value={lang}>
						{lang}
					</option>
				))}
			</select>
			<pre className="p-4 rounded hljs">
				<NodeViewContent as="code" />
			</pre>
		</NodeViewWrapper>
	);
};

export default CodeBlock;
