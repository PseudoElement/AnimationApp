import { createReducer, on } from '@ngrx/store';
import { UserActions } from '.';
import { IUserWithName } from '../../model';
import { omitObjectProp } from '../../utils';

export interface UserState {
    user: IUserWithName | null;
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
        return { ...state, user: { ...state.user, name: newName } as IUserWithName };
    }),
    on(UserActions.setUserPhotoSrc, (state, action) => ({
        ...state,
        user: { ...state.user, photoSrc: action.photoSrc } as IUserWithName,
    }))
);
