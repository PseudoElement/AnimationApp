import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, take, throwError } from 'rxjs';
import { CookiesService } from '../services/cookies.service';
import { TokenService } from '../services/token.service';
import { endpoints, status } from '../api';

@Injectable()
export class TokenHandlerInterceptor implements HttpInterceptor {
    constructor(private cookiesService: CookiesService, private tokenService: TokenService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const access_token = this.cookiesService.getAccessToken() ?? '';

        const newReq = request.clone({
            headers: request.headers.set('access-token', access_token),
        });

        return next.handle(newReq).pipe(
            catchError((err: HttpErrorResponse) => {
                if (
                    err.status === status.unauthorized &&
                    err.url !== endpoints.registerUser &&
                    err.url !== endpoints.loginUser
                ) {
                    return this.tokenService.refreshAccessToken().pipe(
                        take(1),
                        switchMap((res) => {
                            this.cookiesService.setAccessToken(res.access_token);
                            const retryReq = request.clone({
                                headers: request.headers.set('access-token', res.access_token),
                            });
                            return next.handle(retryReq);
                        }),
                        catchError((err) => {
                            return throwError(() => err);
                        })
                    );
                }
                return throwError(() => err);
            })
        );
    }
}
