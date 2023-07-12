import { ChatState } from './chat/chat.reducer';
import { RandomWheelState } from './random-wheel/random-wheel.reducer';
import { UserState } from './user';

export interface AppState {
    user: UserState;
    chat: ChatState;
    randomWheel: RandomWheelState;
}
