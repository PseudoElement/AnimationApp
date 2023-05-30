import { Component, Inject, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { ModalService } from './core/services/modal.service';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/store';
import { Cookies } from './core';
import { setUser } from './core/store/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private themeService: ThemeService,
        public modalService: ModalService,
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        const user = Cookies.getCookie('user');
        console.log('COOKIES USER', user);
        if (user) this.store.dispatch(setUser(JSON.parse(user)));
        this.themeService.initTheme();
    }
}
