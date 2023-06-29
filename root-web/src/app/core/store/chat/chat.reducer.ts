import { createReducer, on } from '@ngrx/store';
import { IMessageInStore } from '../../model';
import { ChatActions } from '.';

export interface ChatState {
    messages: IMessageInStore[];
}

const initialState: ChatState = {
    messages: [],
};

export const chatReducer = createReducer(
    initialState,
    on(ChatActions.addMessage, (state, action) => ({ ...state, messages: [...state.messages, action] })),
    on(ChatActions.deleteMessage, (state, action) => {
        const filteredMessages = state.messages.filter((message) => message.id !== action.id);
        return { ...state, messages: filteredMessages };
    })
);
