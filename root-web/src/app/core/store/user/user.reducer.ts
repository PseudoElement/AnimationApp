import { createReducer, on } from '@ngrx/store';
import { UserOnClient } from '../../model';
import { UserActions } from '.';
import { omitObjectProp } from '../../utils';

export interface UserState {
    user: UserOnClient | null;
}

const initialState: UserState = {
    user: null,
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.setUser, (state, action) => ({ ...state, user: omitObjectProp('type', action) })),
    on(UserActions.unsetUser, (state) => ({ ...state, user: null })),
    on(UserActions.setUserName, (state, action) => {
        const newName = action.name;
        return { ...state, user: { ...state.user, name: newName } as UserOnClient };
    })
);
