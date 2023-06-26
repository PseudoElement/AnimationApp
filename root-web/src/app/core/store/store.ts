import { ChatState } from './chat/chat.reducer';
import { UserState } from './user';

export interface AppState {
    user: UserState;
    chat: ChatState;
}
