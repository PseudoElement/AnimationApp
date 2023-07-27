import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingHandlerInterceptor } from './loading-handler.interceptor';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { RetryRequestInterceptor } from './retry-request.interceptor';
import { TokenHandlerInterceptor } from './token-handler.interceptor';
import { UserIdHandlerInterceptor } from './user-id-handler.interceptor';

export const interceptorsProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingHandlerInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorHandlerInterceptor,
        multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: RetryRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenHandlerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UserIdHandlerInterceptor, multi: true },
];
