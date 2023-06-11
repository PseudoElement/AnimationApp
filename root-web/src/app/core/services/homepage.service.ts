import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../api/endpoints';
import { AlertService } from './alert.service';
import { alerts } from '../constants';
import { IHomePageData } from '../model';

@Injectable({
    providedIn: 'root',
})
export class HomepageService {
    constructor(private http: HttpClient, private alertService: AlertService) {}
    public getHomePageData(): Observable<IHomePageData> {
        return this.http.get<IHomePageData>(endpoints.getHomepage as string).pipe(
            catchError((err) => {
                this.alertService.isOpen$.next(true);
                this.alertService.message$.next(alerts.requestError);
                return of(err);
            })
        );
    }
}
