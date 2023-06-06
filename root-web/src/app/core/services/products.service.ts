import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { endpoints } from '../api/endpoints';
import { AlertService } from './alert.service';
import { alerts } from '../constants';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient, private alertService: AlertService) {}

    public getWebApplications(): Observable<any> {
        return this.http.get(endpoints.getWebApplications as string).pipe(
            catchError((err) => {
                this.alertService.isOpen$.next(true);
                this.alertService.message$.next(alerts.requestError);
                return of(err);
            })
        );
    }
    public getGames(): Observable<any> {
        return this.http.get(endpoints.getGames as string).pipe(
            catchError((err) => {
                this.alertService.isOpen$.next(true);
                this.alertService.message$.next(alerts.requestError);
                return of(err);
            })
        );
    }
}
