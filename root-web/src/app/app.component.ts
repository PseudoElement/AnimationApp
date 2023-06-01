import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { ModalService } from './core/services/modal.service';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/store';
import { Cookies } from './core';
import { loadUser } from './core/store/user/user.actions';

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
        const id = Cookies.getCookie('id');
        if (id) {
            this.store.dispatch(loadUser({ id: JSON.parse(id) }));
        }
        this.themeService.initTheme();
    }
}
