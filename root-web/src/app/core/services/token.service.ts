import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../api';
import { CookiesService } from './cookies.service';
import { IRefreshTokenResponse } from '../model';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    constructor(private http: HttpClient, private cookiesService: CookiesService) {}

    public refreshAccessToken(): Observable<IRefreshTokenResponse> {
        const refresh_token = this.cookiesService.getRefreshToken() as string;
        const userID = this.cookiesService.getUserID() as string;
        return this.http.get<IRefreshTokenResponse>(endpoints.refreshAccessToken as string, {
            headers: {
                'refresh-token': refresh_token,
                'x-user-id': userID,
            },
        });
    }
}
