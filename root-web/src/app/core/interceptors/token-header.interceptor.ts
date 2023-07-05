import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookiesService } from '../services/cookies.service';

@Injectable()
export class TokenHeaderInterceptor implements HttpInterceptor {
    constructor(private cookiesService: CookiesService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const access_token = this.cookiesService.getAccessToken();
        const refresh_token = this.cookiesService.getRefreshToken();
        if (access_token) {
            const newReq = request.clone({
                headers: request.headers.set('access-token', access_token),
            });
            return next.handle(newReq);
        }
        return next.handle(request);
    }
}
