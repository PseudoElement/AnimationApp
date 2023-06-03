import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAboutPageResponse } from '../model';
import { endpoints } from '../api/endpoints';
import { AlertService } from './alert.service';
import { alerts } from '../constants';

@Injectable({
    providedIn: 'root',
})
export class AboutService {
    constructor(private http: HttpClient, private alertService: AlertService) {}

    public getAbout(): Observable<IAboutPageResponse> {
        return this.http.get<IAboutPageResponse>(endpoints.getAbout as string).pipe(
            catchError((err) => {
                this.alertService.isOpen$.next(true);
                this.alertService.message$.next(alerts.requestError);
                return of(err);
            })
        );
    }
}
