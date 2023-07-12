import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { UserEffects, userReducer } from './core/store/user';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { chatReducer } from './core/store/chat';
import { ErrorHandlerInterceptor, LoadingHandlerInterceptor } from './core';
import { TokenHandlerInterceptor } from './core/interceptors/token-handler.interceptor';
import { RetryRequestInterceptor } from './core/interceptors/retry-request.interceptor';
import { randomWheelReducer } from './core/store/random-wheel';
import { RandomWheelEffects } from './core/store/random-wheel/random-wheel.effects';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        PagesModule,
        RouterModule,
        HttpClientModule,
        StoreModule.forRoot({ user: userReducer, chat: chatReducer, randomWheel: randomWheelReducer }),
        EffectsModule.forRoot([UserEffects, RandomWheelEffects]),
        BrowserAnimationsModule,
    ],
    providers: [
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
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
