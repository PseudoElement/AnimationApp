import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { IMessage, IMessageFromServer } from '../model';
import { AppState } from '../store/store';
import { Store } from '@ngrx/store';
import { selectUserEmail, selectUserName } from '../store/user';
import { baseURL } from '../api';
import { ChatActions } from '../store/chat';
import { getNameByEmail } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    socket!: Socket;
    userEmail: string = '';

    constructor(public store: Store<AppState>) {
        this.socket = io(baseURL);
        this.store.select(selectUserEmail).subscribe((email) => (this.userEmail = email as string));
        this.handleMessageFromServer();
    }

    public sendMessage(body: IMessage) {
        this.socket.emit('messageFromClient', body);
    }

    public handleMessageFromServer() {
        this.socket.on('messageFromServer', (message: IMessageFromServer) => {
            const fullDataMessage = {
                ...message.body,
                name: getNameByEmail(message.body.authorEmail),
                isMine: message.body.authorEmail === this.userEmail,
            };
            this.store.dispatch(ChatActions.addMessage(fullDataMessage));
        });
    }
}
