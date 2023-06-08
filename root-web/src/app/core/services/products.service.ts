import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { endpoints } from '../api/endpoints';
import { AlertService } from './alert.service';
import { alerts } from '../constants';
import { IApplicationCard, IGameCard } from '../model';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient, private alertService: AlertService) {}

    public getAllWebApplications(): Observable<IApplicationCard[]> {
        return this.http.get<IApplicationCard[]>(endpoints.getWebApplications as string).pipe(
            catchError((err) => {
                this.alertService.isOpen$.next(true);
                this.alertService.message$.next(alerts.requestError);
                return of(err);
            })
        );
    }
    public getPortionOfApps(pageIndex: number, limit: number): Observable<IApplicationCard[]> {
        return this.http
            .get<IApplicationCard[]>(endpoints.getWebApplications as string, {
                params: {
                    _page: pageIndex,
                    _limit: limit,
                },
            })
            .pipe(
                catchError((err) => {
                    this.alertService.isOpen$.next(true);
                    this.alertService.message$.next(alerts.requestError);
                    return of(err);
                })
            );
    }
    public getGames(): Observable<IGameCard[]> {
        return this.http.get<IGameCard[]>(endpoints.getGames as string).pipe(
            catchError((err) => {
                this.alertService.isOpen$.next(true);
                this.alertService.message$.next(alerts.requestError);
                return of(err);
            })
        );
    }
}
