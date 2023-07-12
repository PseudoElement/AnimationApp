import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { baseURL, endpoints } from '../api';
import { IWinResult } from '../model';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';
import { RandomWheelActions } from '../store/random-wheel';

@Injectable({
    providedIn: 'root',
})
export class OtherPageService {
    private readonly SEND_RESULT = 'resultFromClient';
    private readonly GET_NEW_RESULT = 'resultFromServer';
    private socket!: Socket;
    constructor(private http: HttpClient, private store: Store<AppState>) {
        this.socket = io(baseURL);
        this._handleNewResultFromServer();
    }

    public getAllResults(): Observable<IWinResult[]> {
        return this.http.get<IWinResult[]>(endpoints.getRandomWheelResults as string);
    }

    public closeSocket() {
        this.socket.close();
    }

    public openSocket() {
        this.socket.open();
    }

    public sendNewResult(body: IWinResult) {
        this.socket.emit(this.SEND_RESULT, body);
    }

    private _handleNewResultFromServer() {
        this.socket.on(this.GET_NEW_RESULT, (newResult: IWinResult) => {
            this.store.dispatch(RandomWheelActions.addWinResult(newResult));
        });
    }
}
