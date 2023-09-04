'use client';

import { useSession } from 'next-auth/react';
import {
	createContext,
	useState,
	ReactNode,
	useEffect,
	useContext,
} from 'react';

type Theme = 'dark' | 'light';

type ThemeContext = {
	theme: Theme;
	changeTheme: (theme: Theme) => void;
};

const initialState: ThemeContext = {
	theme: 'light',
	changeTheme: () => null,
};

const ThemeContext = createContext<ThemeContext>(initialState);

export const useThemeContext = (): ThemeContext => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>('light');
	const { data: session } = useSession();

	useEffect(() => {
		const theme = localStorage.getItem('theme') as Theme | null;

		if (theme && session) {
			setTheme(theme);

			if (theme === 'dark') {
				document.documentElement.classList.add('theme-dark');
			}
		} else {
			setTheme('light');
			document.documentElement.classList.remove('theme-dark');
		}
	}, [session]);

	const changeTheme = (theme: Theme) => {
		setTheme(theme);

		localStorage.setItem('theme', theme);

		if (theme === 'dark') {
			document.documentElement.classList.add('theme-dark');
		} else {
			document.documentElement.classList.remove('theme-dark');
		}
	};

	return (
		<ThemeContext.Provider value={{ theme, changeTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
