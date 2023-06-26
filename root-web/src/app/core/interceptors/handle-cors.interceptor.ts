import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HandleCorsInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const cloneRequest = request.clone({
            headers: request.headers.set('Access-Control-Allow-Origin', 'I GIVE ACCESS'),
        });
        return next.handle(request);
    }
}
