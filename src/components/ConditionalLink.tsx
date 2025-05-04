import Link from 'next/link';
import { ReactNode } from 'react';

interface ConditionalLinkProps {
	condition: boolean;
	children: ReactNode;
	href: string;
}

const ConditionalLink = ({
	condition,
	children,
	href,
}: ConditionalLinkProps) => {
	return condition ? <Link href={href}>{children}</Link> : children;
};

export default ConditionalLink;
