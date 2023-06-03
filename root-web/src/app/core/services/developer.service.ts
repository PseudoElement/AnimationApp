import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeveloper } from '../model';
import { endpoints } from '../api/endpoints';
import { alerts } from '../constants';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root',
})
export class DeveloperService {
    constructor(private http: HttpClient, private alertService: AlertService) {}

    public getDeveloper(id: string): Observable<IDeveloper> {
        return this.http.get<IDeveloper>((endpoints.getDeveloper as (id: string) => string)(id)).pipe(
            catchError((err) => {
                this.alertService.isOpen$.next(true);
                this.alertService.message$.next(alerts.requestError);
                return of(err);
            })
        );
    }
}
