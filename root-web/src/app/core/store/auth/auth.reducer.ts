import { createReducer, on } from '@ngrx/store';
import { UserOnClient } from '../../model';

const initialState: UserOnClient = {
    email: null,
    name: null,
    token: null,
    id: null,
};

export const authReducer = createReducer(initialState);
