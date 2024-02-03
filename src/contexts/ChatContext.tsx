import { User } from '@prisma/client';
import {
	Dispatch,
	ReactNode,
	createContext,
	useContext,
	useReducer,
} from 'react';

type ChatState = {
	open: boolean;
	user?: User;
};
type ChatAction =
	| { type: 'setUser'; payload: ChatState['user'] }
	| { type: 'setOpen'; payload: ChatState['open'] };

const initialState: ChatState = {
	open: false,
	user: undefined,
};

type ChatContext = [ChatState, Dispatch<ChatAction>];

const chatReducer = (state: ChatState, action: ChatAction) => {
	if (action.type === 'setUser') {
		return { ...state, user: action.payload };
	}
	if (action.type === 'setOpen') {
		return { ...state, open: action.payload };
	}

	return state;
};

const ChatContext = createContext<ChatContext>([initialState, () => {}]);

export const useChatContext = (): ChatContext => useContext(ChatContext);

const ChatProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(chatReducer, initialState);

	return (
		<ChatContext.Provider value={[state, dispatch]}>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatProvider;
