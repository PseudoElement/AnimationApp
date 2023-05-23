import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { links, scrollPoints } from 'src/app/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { ThemeService } from 'src/app/core/services/theme.service';

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

    constructor(public modalService: ModalService, public themeService: ThemeService) {}

    ngOnInit(): void {
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

    public openModal() {
        this.modalService.toggleVisibility('auth');
    }
}
