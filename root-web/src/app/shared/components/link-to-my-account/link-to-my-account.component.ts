import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/store';
import { selectUserName, selectUserPhoto } from 'src/app/core/store/user';

@Component({
    selector: 'app-link-to-my-account',
    templateUrl: './link-to-my-account.component.html',
    styleUrls: ['./link-to-my-account.component.scss'],
})
export class LinkToMyAccountComponent {
    username$: Observable<string | undefined>;
    userPhoto$: Observable<string | undefined>;

    constructor(private store: Store<AppState>) {
        this.username$ = this.store.select(selectUserName);
        this.userPhoto$ = this.store.select(selectUserPhoto);
    }
}
