import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './core/store/user';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        PagesModule,
        RouterModule,
        HttpClientModule,
        StoreModule.forRoot({ user: userReducer }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
