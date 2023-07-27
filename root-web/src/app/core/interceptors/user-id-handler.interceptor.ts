import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookiesService } from '../services/cookies.service';

@Injectable()
export class UserIdHandlerInterceptor implements HttpInterceptor {
    constructor(private cookiesService: CookiesService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const id = this.cookiesService.getUserID();
        if (!id) return next.handle(request);
        const newReq = request.clone({
            headers: request.headers.set('user-id', id),
        });
        return next.handle(newReq);
    }
}
