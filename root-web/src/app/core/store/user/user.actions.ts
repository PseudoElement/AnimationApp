import { createAction, props } from '@ngrx/store';
import { IUser, IUserWithName } from '../../model';

export const setUser = createAction('[USER] setUser', props<IUserWithName>());
export const unsetUser = createAction('[USER] unsetUser');
export const setUserName = createAction('[USER] setUserName', props<{ name: string }>());
export const loadUser = createAction('[USER] loadUser', props<{ id: string }>());
