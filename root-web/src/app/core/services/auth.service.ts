import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_KEY, endpoints } from '../api/endpoints';
import { UserOnServer } from '../model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // user = null;
    // error: string | null = null;
    constructor(private http: HttpClient) {}

    public getAllUsers(): Observable<UserOnServer[]> {
        return this.http.get<UserOnServer[]>(endpoints.getAllUsers as string);
    }

    public registerUser(user: UserOnServer): Observable<UserOnServer> {
        return this.http.post<UserOnServer>(endpoints.registerUser as string, user);
    }

    public getUser(id: string): Observable<UserOnServer> {
        return this.http.get<UserOnServer>((endpoints.getUser as (id: string) => string)(id));
    }
}
