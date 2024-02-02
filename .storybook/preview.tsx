import { MockedProvider } from '@apollo/client/testing';
import type { Decorator, Preview } from '@storybook/react';
import React, { useEffect } from 'react';

const withTheme: Decorator = (StoryFn, context) => {
	const theme = context.parameters.theme || context.globals.theme;

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('theme-dark');
		} else {
			document.documentElement.classList.remove('theme-dark');
		}
	}, [theme]);

	return <StoryFn />;
};

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		apolloClient: {
			MockedProvider,
		},
	},
	decorators: [withTheme],
	globalTypes: {
		theme: {
			name: 'Theme',
			description: 'Global theme',
			defaultValue: 'light',
			toolbar: {
				icon: 'circlehollow',
				items: [
					{ value: 'light', title: 'light' },
					{ value: 'dark', title: 'dark' },
				],
				showName: true,
			},
		},
	},
};

export default preview;
