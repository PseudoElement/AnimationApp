import { createAction, props } from '@ngrx/store';
import { IUserWithName } from '../../model';

export const setUser = createAction('[USER] setUser', props<IUserWithName>());
export const unsetUser = createAction('[USER] unsetUser');
export const setUserName = createAction('[USER] setUserName', props<{ name: string }>());
export const setUserPhotoSrc = createAction('[USER] setUserPhotoSrc', props<{ photoSrc: string }>());
export const loadUser = createAction('[USER] loadUser', props<{ id: string }>());
export const logoutUser = createAction('[USER] logoutUser');
