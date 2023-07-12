import { createSelector } from '@ngrx/store';
import { AppState } from '../store';
import { RandomWheelState } from './random-wheel.reducer';

const selectRandomWheelFeature = (state: AppState) => state.randomWheel;

export const selectResults = createSelector(selectRandomWheelFeature, (state: RandomWheelState) => state.results);
