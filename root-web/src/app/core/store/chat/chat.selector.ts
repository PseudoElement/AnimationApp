import { createSelector } from '@ngrx/store';
import { AppState } from '../store';
import { ChatState } from '.';

export const selectChatFeature = (state: AppState) => state.chat;

export const selectMessages = createSelector(selectChatFeature, (state: ChatState) => state.messages);
