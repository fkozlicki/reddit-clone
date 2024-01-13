import { ReactNode } from 'react';

interface WrapperProps {
	condition: boolean;
	children: ReactNode;
	wrap: (children: ReactNode) => JSX.Element;
}

const Wrapper = ({ condition, wrap, children }: WrapperProps) => {
	return condition ? wrap(children) : children;
};

export default Wrapper;
