import { BehaviorSubject, filter } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { ModalService } from './core/services/modal.service';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/store';
import { Cookies } from './core';
import { loadUser } from './core/store/user/user.actions';
import { LoadingService } from './core/services/loading.service';
import { NavigationEnd, Router } from '@angular/router';
import { slideInLeftAnimation } from 'angular-animations';
import { CookiesService } from './core/services/cookies.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [slideInLeftAnimation({ duration: 500 })],
})
export class AppComponent implements OnInit {
    isLoading$: BehaviorSubject<boolean>;
    isChangedRoute: boolean = false;
    constructor(
        private themeService: ThemeService,
        public modalService: ModalService,
        private store: Store<AppState>,
        public loadingService: LoadingService,
        private router: Router,
        private cookiesService: CookiesService
    ) {
        this.isLoading$ = this.loadingService.isLoading$;
        this.router.events.pipe(filter((val) => val instanceof NavigationEnd)).subscribe(() => {
            this.isChangedRoute = true;
            setTimeout(() => (this.isChangedRoute = false), 400);
        });
    }

    ngOnInit(): void {
        const id = this.cookiesService.getUserID();
        if (id) this.store.dispatch(loadUser({ id }));
        this.themeService.initTheme();
    }
}
