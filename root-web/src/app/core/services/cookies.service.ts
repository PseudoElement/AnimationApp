import { Injectable } from '@angular/core';
import { Cookies } from '../utils';
import { IOnUserAuth } from '../model';

@Injectable({
    providedIn: 'root',
})
export class CookiesService {
    private readonly accesTokenExpiration_1hr = new Date(Date.now() + 3600000);
    private readonly refreshTokenExpiration_7days = new Date(Date.now() + 6.048e8);

    constructor() {}

    public onUserLogout() {
        this._deleteAccessToken();
        this._deleteRefreshToken();
        this._deleteUserID();
    }

    public onUserAuth({ access_token, refresh_token, id }: IOnUserAuth) {
        this.setAccessToken(access_token);
        this._setRefreshToken(refresh_token);
        this._setUserID(id);
    }

    public getAccessToken(): string | null {
        return Cookies.getCookie('access_token') ?? null;
    }

    public getRefreshToken(): string | null {
        return Cookies.getCookie('refresh_token') ?? null;
    }

    public getUserID(): string | null {
        return Cookies.getCookie('id') ?? null;
    }

    public setAccessToken(value: string): void {
        Cookies.setCookie('access_token', value, this.accesTokenExpiration_1hr);
    }

    private _setRefreshToken(value: string): void {
        Cookies.setCookie('refresh_token', value, this.refreshTokenExpiration_7days);
    }

    private _setUserID(value: string): void {
        Cookies.setCookie('id', value);
    }

    private _deleteAccessToken() {
        Cookies.deleteCookie('access_token');
    }
    private _deleteRefreshToken() {
        Cookies.deleteCookie('refresh_token');
    }
    private _deleteUserID() {
        Cookies.deleteCookie('id');
    }
}
