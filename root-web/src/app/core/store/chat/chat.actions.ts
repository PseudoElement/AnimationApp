import { createAction, props } from '@ngrx/store';
import { IMessageInStore } from '../../model';

export const addMessage = createAction('[CHAT] addMessage', props<IMessageInStore>());
export const deleteMessage = createAction('[CHAT] deleteMessage', props<{ id: string }>());
