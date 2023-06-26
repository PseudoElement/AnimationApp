import { createAction, props } from '@ngrx/store';
import { IMessageFromServer } from '../../model';

export const addMessage = createAction('[CHAT] addMessage', props<IMessageFromServer>());
export const deleteMessage = createAction('[CHAT] deleteMessage', props<{ id: string }>());
