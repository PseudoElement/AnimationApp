import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, retry, timer } from 'rxjs';
import { status } from '../api';

@Injectable()
export class RetryRequestInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            retry({
                count: 0,
                delay(error: HttpErrorResponse, retryCount) {
                    if (error.status !== status.unauthorized && error.status !== status.conflict) {
                        return timer(1000);
                    }
                    throw error;
                },
            })
        );
    }
}
