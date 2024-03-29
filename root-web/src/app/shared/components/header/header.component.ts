import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, Observable, fromEvent, BehaviorSubject } from 'rxjs';
import { Cookies, IUser, MAX_MOBILE_WIDTH, MAX_TABLET_WIDTH, alerts, links, scrollPoints } from 'src/app/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ScreenSizeService } from 'src/app/core/services/screen-size.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { AppState } from 'src/app/core/store/store';
import { selectUser, UserActions } from 'src/app/core/store/user';
import { opacityAnimation } from '../../animations';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/core/services/cookies.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [opacityAnimation()],
})
export class HeaderComponent implements OnInit, OnDestroy {
    links = links;
    isDestroyed$: Subject<boolean> = new Subject();
    isScrolled$: BehaviorSubject<boolean>;
    isVisibleHeader$: BehaviorSubject<boolean>;
    user$: Observable<IUser | null>;
    logoSize: number = 85;
    isTabletOrMobile: boolean = false;
    isOpenMobileMenu: boolean = false;

    constructor(
        public modalService: ModalService,
        public themeService: ThemeService,
        private store: Store<AppState>,
        private alertService: AlertService,
        private headerService: HeaderService,
        public screenSizeService: ScreenSizeService,
        private router: Router,
        private cookiesService: CookiesService
    ) {
        this.user$ = this.store.select(selectUser);
        this.isVisibleHeader$ = this.headerService.isVisible$;
        this.isScrolled$ = this.headerService.isScrolled$;
        this.screenSizeService
            .getSizes()
            .pipe(takeUntil(this.isDestroyed$))
            .subscribe((size) => {
                if (size.width > MAX_TABLET_WIDTH) {
                    this.logoSize = 85;
                    this.isTabletOrMobile = false;
                } else if (size.width > MAX_MOBILE_WIDTH) {
                    this.isTabletOrMobile = true;
                } else {
                    this.isTabletOrMobile = true;
                    this.logoSize = 70;
                }
            });
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
        this.store.dispatch(UserActions.logoutUser());
        this.cookiesService.onUserLogout();
    }

    public openModal() {
        this.modalService.toggleVisibility('auth');
    }

    public onMenuClick() {
        this.isOpenMobileMenu = !this.isOpenMobileMenu;
    }

    public onNavigationClick(url: string) {
        this.router.navigateByUrl(url);
    }
}
