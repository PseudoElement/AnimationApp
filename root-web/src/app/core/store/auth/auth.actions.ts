import { createAction } from '@ngrx/store';

export const getUsers = createAction('getUsers');
export const loginUser = createAction('loginUser');
export const logoutUser = createAction('logoutUser');
export const registerUser = createAction('registerUser');
export const deleteUser = createAction('deleteUser');
