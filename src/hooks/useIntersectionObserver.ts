import { RefObject, useEffect, useRef, useState } from 'react';

type Options = {
	root?: Element | null;
	rootMargin?: string;
	threshold?: number | number[];
};

export function useIntersectionObserver<T extends Element>(
	options: Options = {}
): [RefObject<T>, IntersectionObserverEntry | null] {
	const { threshold = 1, root = null, rootMargin = '0%' } = options;
	const ref = useRef<T>(null);
	const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

	useEffect(() => {
		const node = ref?.current;

		if (!node || typeof IntersectionObserver !== 'function') {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				setEntry(entry);
			},
			{ threshold, root, rootMargin }
		);

		observer.observe(node);

		return () => {
			setEntry(null);
			observer.disconnect();
		};
	}, [threshold, root, rootMargin]);

	return [ref, entry];
}
