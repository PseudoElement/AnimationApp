import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { IMessage, IMessageFromServer } from '../model';
import { AppState } from '../store/store';
import { Store } from '@ngrx/store';
import { selectUserEmail, selectUserName } from '../store/user';
import { baseURL } from '../api';
import { ChatActions } from '../store/chat';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    socket!: Socket;
    userName: string = '';

    constructor(public store: Store<AppState>) {
        this.socket = io(baseURL);
        this.store.select(selectUserName).subscribe((name) => (this.userName = name as string));
        this.handleMessageFromServer();
    }

    public sendMessage(body: IMessage) {
        this.socket.emit('messageFromClient', body);
    }

    public handleMessageFromServer() {
        this.socket.on('messageFromServer', (message: IMessage) => {
            const fullDataMessage = { ...message, isMine: message.author === this.userName };
            this.store.dispatch(ChatActions.addMessage(fullDataMessage));
        });
    }
}
