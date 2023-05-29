import { createSelector } from '@ngrx/store';
import { AppState } from '../store';
import { UserOnClient } from '../../model';

export const selectUser = (state: AppState) => state.user;

export const selectUserName = createSelector(selectUser, (state: UserOnClient) => state.name);
export const selectUserEmail = createSelector(selectUser, (state: UserOnClient) => state.email);
export const selectUserToken = createSelector(selectUser, (state: UserOnClient) => state.token);
export const selectUserID = createSelector(selectUser, (state: UserOnClient) => state.token);
