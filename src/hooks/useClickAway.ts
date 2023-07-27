import { useRef, useEffect } from 'react';

type ClickAwayCallback = (event: MouseEvent | TouchEvent) => void;

export function useClickAway<T extends HTMLElement>(cb: ClickAwayCallback) {
	const ref = useRef<T>(null);
	const refCb = useRef<ClickAwayCallback>(cb);

	useEffect(() => {
		const handler = (event: MouseEvent | TouchEvent) => {
			const element = ref.current;
			if (element && !element.contains(event.target as Node)) {
				refCb.current(event);
			}
		};

		document.addEventListener('mousedown', handler);
		document.addEventListener('touchstart', (e) => e);

		return () => {
			document.removeEventListener('mousedown', handler);
			document.removeEventListener('touchstart', handler);
		};
	}, []);

	return ref;
}
