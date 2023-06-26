import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    socket: Socket;

    constructor() {
        this.socket = io('http://localhost:3000');
    }

    public connect() {
        this.socket.connect();
    }

    public disconnect() {
        this.socket.off();
    }
    public sendMessage(message: string) {
        console.log('message: ', message);
        this.socket.emit('messageFromClient', message);
    }

    public getNewMessage() {
        this.socket.on('messageFromServer', (message) => {
            console.log('Message from server', message);
        });
    }
}
