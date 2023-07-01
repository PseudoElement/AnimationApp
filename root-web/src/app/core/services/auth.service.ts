import { Observable, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { endpoints } from '../api/endpoints';
import { ILoginData, IRegisterData, IUser, IUserWithoutAccessToken } from '../model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoading: boolean = false;

    constructor(private http: HttpClient) {}

    public getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(endpoints.getAllUsers as string);
    }

    public registerUser(data: IRegisterData): Observable<HttpResponse<IUser>> {
        return this.http.post<IUser>(endpoints.registerUser as string, data, { observe: 'response' });
    }

    public loginUser(data: ILoginData): Observable<HttpResponse<IUser>> {
        return this.http.post<IUser>(endpoints.loginUser as string, data, { observe: 'response' });
    }

    public getUser(id: string): Observable<IUserWithoutAccessToken> {
        return this.http.get<IUserWithoutAccessToken>((endpoints.getUser as (id: string) => string)(id));
    }
}
