import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatState, Message } from '../types';

type Action =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_MESSAGES' };

const initialState: ChatState = {
  currentSession: null,
  messages: [],
  isLoading: false,
  error: null,
};

const chatReducer = (state: ChatState, action: Action): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_MESSAGES':
        return {
            ...state,
            messages: []
        }
    default:
      return state;
  }
};

interface ChatContextType extends ChatState {
  addMessage: (message: Message) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const addMessage = (message: Message) => dispatch({ type: 'ADD_MESSAGE', payload: message });
  const setLoading = (isLoading: boolean) => dispatch({ type: 'SET_LOADING', payload: isLoading });
  const setError = (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error });

  return (
    <ChatContext.Provider value={{ ...state, addMessage, setLoading, setError }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
};