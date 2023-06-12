import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, catchError, finalize, of, tap } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { AlertService } from '../services/alert.service';
import { alerts } from '../constants';

@Injectable()
export class LoadingHandlerInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService, private alertService: AlertService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            tap(() => this.loadingService.isLoading$.next(true)),
            finalize(() => this.loadingService.isLoading$.next(false)),
            catchError((err) => {
                this.alertService.isOpen$.next(true);
                this.alertService.message$.next(alerts.requestError);
                this.loadingService.isLoading$.next(false);
                return of(err);
            })
        );
    }
}
