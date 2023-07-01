import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { alerts } from '../constants';
import { AlertService } from '../services/alert.service';
import { status } from '../api';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private alertService: AlertService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((err) => {
                const httpErrorRes = err as HttpErrorResponse;
                this.alertService.isOpen$.next(true);
                switch (httpErrorRes.status) {
                    case status.conflict:
                        this.alertService.message$.next(alerts.userExists);
                        break;
                    case status.requestError:
                        this.alertService.message$.next(alerts.requestError);
                        break;
                    case status.unauthorized:
                        this.alertService.message$.next(alerts.incorrectPassword);
                        break;
                    case status.notFound:
                        this.alertService.message$.next(alerts.userDoesntExist);
                        break;
                    case status.serverError:
                        this.alertService.message$.next(alerts.serverError);
                        break;
                }
                return of(err);
            })
        );
    }
}
