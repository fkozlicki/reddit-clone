'use client';

import {
	createContext,
	type Dispatch,
	type ReactNode,
	useReducer,
	useContext,
} from 'react';

type ModalsState = {
	signIn: boolean;
};
type ModalAction = { type: 'openSignIn' } | { type: 'closeSignIn' };

const initialState: ModalsState = {
	signIn: false,
};

type ModalsContext = [ModalsState, Dispatch<ModalAction>];

const modalsReducer = (state: ModalsState, action: ModalAction) => {
	if (action.type === 'openSignIn') {
		document.body.style.overflow = 'hidden';
		return { ...state, signIn: true };
	}
	if (action.type === 'closeSignIn') {
		document.body.style.overflow = '';
		return { ...state, signIn: false };
	}
	return state;
};

const ModalsContext = createContext<ModalsContext>([initialState, () => null]);

export const useModalsContext = (): ModalsContext => useContext(ModalsContext);

const ModalsProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer<
		(state: ModalsState, action: ModalAction) => ModalsState
	>(modalsReducer, initialState);

	return (
		<ModalsContext.Provider value={[state, dispatch]}>
			{children}
		</ModalsContext.Provider>
	);
};

export default ModalsProvider;
