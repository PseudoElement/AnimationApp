import { createSelector } from '@ngrx/store';
import { AppState } from '../store';
import { UserState } from './user.reducer';

const selectUserFeature = (state: AppState) => state.user;

export const selectUser = createSelector(selectUserFeature, (state: UserState) => state.user);
export const selectUserEmail = createSelector(selectUserFeature, (state: UserState) => state.user?.email);
export const selectUserName = createSelector(selectUserFeature, (state: UserState) => state.user?.name);
export const selectUserToken = createSelector(selectUserFeature, (state: UserState) => state.user?.access_token);
export const selectUserID = createSelector(selectUserFeature, (state: UserState) => state.user?.id);
