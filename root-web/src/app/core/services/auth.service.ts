import { Observable, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../api/endpoints';
import { UserOnServer } from '../model';
import { alerts } from '../constants';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoading: boolean = false;

    constructor(private http: HttpClient, private alertService: AlertService) {}

    public getAllUsers(): Observable<UserOnServer[]> {
        return this.http.get<UserOnServer[]>(endpoints.getAllUsers as string).pipe(
            catchError((err) => {
                this.alertService.isOpen$.next(true);
                this.alertService.message$.next(alerts.requestError);
                return of(err);
            })
        );
    }

    public registerUser(user: UserOnServer): Observable<UserOnServer> {
        return this.http.post<UserOnServer>(endpoints.registerUser as string, user);
    }

    public getUser(id: string): Observable<UserOnServer> {
        return this.http.get<UserOnServer>((endpoints.getUser as (id: string) => string)(id));
    }
}
