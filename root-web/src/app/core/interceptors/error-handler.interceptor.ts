import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private alertService: AlertService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((err) => {
                const httpErrorRes = err as HttpErrorResponse;
                console.log('ERROR_HANDLER_INTERCEPTOR', httpErrorRes);
                this.alertService.isOpen$.next(true);
                this.alertService.message$.next(httpErrorRes.message);
                return throwError(() => err);
            })
        );
    }
}
