import { createReducer, on } from '@ngrx/store';
import { UserOnClient } from '../../model';
import * as UserActions from './user.actions';

const initialState: UserOnClient = {
    email: null,
    name: null,
    token: null,
    id: null,
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.setUser, (state, action) => {
        return {
            ...state,
            email: action.email,
            id: action.id,
            name: action.name,
            token: action.token,
            type: action.type,
        };
    }),
    on(UserActions.unsetUser, (state, action) => {
        return { email: null, id: null, name: null, token: null };
    }),
    on(UserActions.setUserName, (state, action) => ({ ...state, name: action.name }))
);
