import { createReducer, on } from '@ngrx/store';
import { IMessageInStore } from '../../model';
import { ChatActions } from '.';

export interface ChatState {
    messages: IMessageInStore[];
    isOpenChat: boolean;
}

const initialState: ChatState = {
    messages: [],
    isOpenChat: false,
};

export const chatReducer = createReducer(
    initialState,
    on(ChatActions.loadMessagesFromDB, (state, action) => ({ ...state, messages: action.messages })),
    on(ChatActions.addMessage, (state, action) => ({ ...state, messages: [...state.messages, action] })),
    on(ChatActions.deleteMessage, (state, action) => {
        const filteredMessages = state.messages.filter((message) => message.id !== action.id);
        return { ...state, messages: filteredMessages };
    }),
    on(ChatActions.deleteOldestMessage, (state, action) => {
        const filteredMessages = state.messages.filter((message, index) => index !== 0);
        return { ...state, messages: filteredMessages };
    }),
    on(ChatActions.openChat, (state) => ({ ...state, isOpenChat: true }))
);
