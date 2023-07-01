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
import { HandleCorsInterceptor } from './core/interceptors/handle-cors.interceptor';
import { chatReducer } from './core/store/chat';
import { ErrorHandlerInterceptor, LoadingHandlerInterceptor } from './core';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        PagesModule,
        RouterModule,
        HttpClientModule,
        StoreModule.forRoot({ user: userReducer, chat: chatReducer }),
        EffectsModule.forRoot([UserEffects]),
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
            useClass: HandleCorsInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
