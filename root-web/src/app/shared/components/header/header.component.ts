import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, Observable, fromEvent, BehaviorSubject } from 'rxjs';
import { Cookies, UserOnClient, alerts, links, scrollPoints } from 'src/app/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { AppState } from 'src/app/core/store/store';
import { selectUser, UserActions } from 'src/app/core/store/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    links = links;
    isDestroyed$: Subject<boolean> = new Subject();
    isScrolled$: BehaviorSubject<boolean>;
    isVisibleHeader$: BehaviorSubject<boolean>;
    user$: Observable<UserOnClient | null>;

    constructor(
        public modalService: ModalService,
        public themeService: ThemeService,
        private store: Store<AppState>,
        private alertService: AlertService,
        private headerService: HeaderService
    ) {
        this.user$ = this.store.select(selectUser);
        this.isVisibleHeader$ = this.headerService.isVisible$;
        this.isScrolled$ = this.headerService.isScrolled$;
    }

    async ngOnInit(): Promise<void> {
        let prevScrollpos = window.scrollY;
        fromEvent(document, 'scroll')
            .pipe(takeUntil(this.isDestroyed$))
            .subscribe(() => {
                let currentScrollPos = window.scrollY;
                if (window.scrollY > scrollPoints.showHide && prevScrollpos < currentScrollPos) {
                    this.isScrolled$.next(true);
                    this.isVisibleHeader$.next(false);
                } else if (window.scrollY > scrollPoints.useOpacityHeader) {
                    this.isScrolled$.next(true);
                    this.isVisibleHeader$.next(true);
                } else {
                    this.isScrolled$.next(false);
                    this.isVisibleHeader$.next(true);
                }
                prevScrollpos = currentScrollPos;
            });
        this.alertService.message$.subscribe((val) => console.log('message', val));
    }

    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
        this.isDestroyed$.complete();
    }

    public onChangeTheme() {
        this.themeService.changeTheme();
    }

    public onLogout() {
        this.alertService.isOpen$.next(true);
        this.alertService.message$.next(alerts.logout);
        this.store.dispatch(UserActions.unsetUser());
        Cookies.deleteCookie('id');
        Cookies.deleteCookie('token');
    }

    public openModal() {
        this.modalService.toggleVisibility('auth');
    }
}
