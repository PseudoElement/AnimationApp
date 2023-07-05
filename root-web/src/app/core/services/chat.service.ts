import { map, filter } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { IMessage, IMessageWithoutID } from '../model';
import { AppState } from '../store/store';
import { Store } from '@ngrx/store';
import { selectUserEmail } from '../store/user';
import { baseURL, endpoints } from '../api';
import { ChatActions } from '../store/chat';
import { getNameByEmail } from '../utils';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    socket!: Socket;
    userEmail: string = '';

    constructor(public store: Store<AppState>, public http: HttpClient) {
        this.socket = io(baseURL);
        this.store.select(selectUserEmail).subscribe((email) => (this.userEmail = email as string));
        this._handleMessageFromServer();
        this._handleDeleteOldestMessage();
    }

    public getAllMessagesFromDB(): void {
        this.http
            .get<IMessage[]>(endpoints.getAllMessagesFromDB as string)
            .pipe(
                filter((messages) => messages.length > 0),
                map((messages) =>
                    messages.map((message) => ({
                        ...message,
                        name: getNameByEmail(message.authorEmail),
                        isMine: message.authorEmail === this.userEmail,
                    }))
                )
            )
            .subscribe((messages) => {
                this.store.dispatch(ChatActions.loadMessagesFromDB({ messages }));
            });
    }

    public sendMessage(body: IMessageWithoutID) {
        this.socket.emit('messageFromClient', body);
    }

    private _handleMessageFromServer() {
        this.socket.on('messageFromServer', (message: IMessage) => {
            const fullDataMessage = {
                ...message,
                name: getNameByEmail(message.authorEmail),
                isMine: message.authorEmail === this.userEmail,
            };
            this.store.dispatch(ChatActions.addMessage(fullDataMessage));
        });
    }

    private _handleDeleteOldestMessage() {
        this.socket.on('deleteOldestMessage', () => {
            this.store.dispatch(ChatActions.deleteOldestMessage());
        });
    }
}
