import { IErrorInnerInHttpErrorResponse } from './../model/interceptors';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { status } from '../api';
import { alerts } from '../constants';
import { IExtendedHttpErrorResponse } from '../model';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private alertService: AlertService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((err: IExtendedHttpErrorResponse) => {
                this.alertService.isOpen$.next(true);
                if (err.status === status.notFound) this.alertService.message$.next(alerts.pageNotFound);
                else this.alertService.message$.next(this._getErrorMessage(err));
                return throwError(() => err);
            })
        );
    }

    private _getErrorMessage(errorBody: IExtendedHttpErrorResponse): string {
        console.log(errorBody);
        if (!errorBody.error) return 'Unknown error.';
        if (typeof errorBody.error !== 'string') {
            if (Array.isArray(errorBody.error.message)) return errorBody.error.message.join('. ');
            else return errorBody.error.message;
        } else return errorBody.error;
    }
}
