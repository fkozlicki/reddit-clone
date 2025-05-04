'use client';

import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';

export default function JoinRedditButton() {
	const [, dispatch] = useModalsContext();

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	return (
		<Button
			onClick={openSignIn}
			className="w-full"
			variant="primary"
			size="large"
		>
			Join Reddit
		</Button>
	);
}
