import { createReducer, on } from '@ngrx/store';
import { IWinResult } from '../../model';
import { RandomWheelActions } from '.';
import { omitObjectProp } from '../../utils';

export interface RandomWheelState {
    results: IWinResult[];
}

const initialState: RandomWheelState = {
    results: [],
};

export const randomWheelReducer = createReducer(
    initialState,
    on(RandomWheelActions.addWinResult, (state: RandomWheelState, action) => ({
        ...state,
        results: [...state.results, omitObjectProp('type', action)],
    })),
    on(RandomWheelActions.setResultsArray, (state: RandomWheelState, action: { results: IWinResult[] }) => ({
        ...state,
        results: action.results,
    }))
);
