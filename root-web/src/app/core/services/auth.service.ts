import { Observable, tap, map, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser, IUserResponse } from '../model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_KEY, endpoints } from '../api/endpoints';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user: IUserResponse | null = null;
    error: string | null = null;
    constructor(private http: HttpClient) {}

    public login(user: IUser): Observable<IUserResponse | unknown> {
        return this.http
            .post<any>(endpoints.login, user, {
                params: {
                    email: user.email,
                    password: user.password,
                    rememberMe: true,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': API_KEY,
                },
            })
            .pipe(
                map((res) => res.data),
                map((res) => ({ ...res, email: user.email })),
                tap((user) => console.log('TAP', user)),
                catchError((err: HttpErrorResponse) => (this.error = err.message))
            );
    }
}
