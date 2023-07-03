import { createSelector } from '@ngrx/store';
import { AppState } from '../store';
import { ChatState } from '.';

export const selectChatFeature = (state: AppState) => state.chat;

export const selectMessages = createSelector(selectChatFeature, (state: ChatState) => state.messages);
export const selectIsOpenChat = createSelector(selectChatFeature, (state: ChatState) => state.isOpenChat);
