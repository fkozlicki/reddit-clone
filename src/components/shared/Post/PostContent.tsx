import { useEffect } from 'react';

import hljs from 'highlight.js';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);

const PostContent = ({ content }: { content: string }) => {
	useEffect(() => {
		hljs.highlightAll();
	});

	return (
		<div
			className="text-primary text-sm [&>p]:mb-4 rounded"
			dangerouslySetInnerHTML={{
				__html: content,
			}}
		/>
	);
};

export default PostContent;
