import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, Observable, fromEvent } from 'rxjs';
import { Cookies, UserOnClient, links, scrollPoints } from 'src/app/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { AppState } from 'src/app/core/store/store';
import { selectUser, setUserName, unsetUser } from 'src/app/core/store/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    links = links;
    isDestroyed$: Subject<boolean> = new Subject();
    isScrolled = false;
    isVisibleHeader = true;
    user$: Observable<UserOnClient | null>;

    constructor(
        public modalService: ModalService,
        public themeService: ThemeService,
        private store: Store<AppState>,
        private alertService: AlertService
    ) {
        this.user$ = this.store.select(selectUser);
    }

    async ngOnInit(): Promise<void> {
        let prevScrollpos = window.scrollY;
        fromEvent(document, 'scroll')
            .pipe(takeUntil(this.isDestroyed$))
            .subscribe(() => {
                let currentScrollPos = window.scrollY;
                if (window.scrollY > scrollPoints.showHide && prevScrollpos < currentScrollPos) {
                    this.isScrolled = true;
                    this.isVisibleHeader = false;
                } else if (window.scrollY > scrollPoints.useOpacityHeader) {
                    this.isScrolled = true;
                    this.isVisibleHeader = true;
                } else {
                    this.isScrolled = false;
                    this.isVisibleHeader = true;
                }
                prevScrollpos = currentScrollPos;
            });
    }

    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
        this.isDestroyed$.complete();
    }

    public onChangeTheme() {
        this.themeService.changeTheme();
    }

    public onLogout() {
        this.alertService.message$.next('You got off system!');
        this.store.dispatch(unsetUser());
        Cookies.deleteCookie('user');
    }

    public openModal() {
        this.modalService.toggleVisibility('auth');
    }
}
