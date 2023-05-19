import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { links } from 'src/app/core';

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

    ngOnInit(): void {
        let prevScrollpos = window.scrollY;
        fromEvent(document, 'scroll')
            .pipe(takeUntil(this.isDestroyed$))
            .subscribe(() => {
                let currentScrollPos = window.scrollY;
                if (window.scrollY > 400 && prevScrollpos < currentScrollPos) {
                    this.isScrolled = true;
                    this.isVisibleHeader = false;
                } else if (window.scrollY > 50) {
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
}
