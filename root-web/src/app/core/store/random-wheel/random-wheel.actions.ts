import { createAction, props } from '@ngrx/store';
import { IWinResult } from '../../model';

export const addWinResult = createAction('[RANDOM-WHEEL-RESULTS] addWinResult', props<IWinResult>());
export const loadAllResultsFromDB = createAction('[RANDOM-WHEEL-RESULTS] loadAllResultsFromDB');
export const setResultsArray = createAction(
    '[RANDOM-WHEEL-RESULTS] setResultsArray',
    props<{ results: IWinResult[] }>()
);
