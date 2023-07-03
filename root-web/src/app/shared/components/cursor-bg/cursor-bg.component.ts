import { map, takeUntil, Observable, Subscription, fromEvent, takeWhile } from 'rxjs';
import { Component, HostListener, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ScreenSizeService } from 'src/app/core/services/screen-size.service';
import { MAX_TABLET_WIDTH } from 'src/app/core';

@Component({
    selector: 'app-cursor-bg',
    templateUrl: './cursor-bg.component.html',
    styleUrls: ['./cursor-bg.component.scss'],
})
export class CursorBgComponent implements OnInit {
    el!: HTMLElement;
    isVisible$: Observable<boolean>;
    @ViewChild('elRef', { static: true }) elRef!: ElementRef;
    constructor(private screenSize: ScreenSizeService) {
        this.isVisible$ = this.screenSize.getSizes().pipe(map((size) => size.width > MAX_TABLET_WIDTH));
    }
    @HostListener('window:mousemove', ['$event']) omMouseMove(e: MouseEvent) {
        if (window.innerWidth < MAX_TABLET_WIDTH) return;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        if (this.el) {
            this.el.style.top = `${window.scrollY + mouseY}px`;
            this.el.style.left = `${window.scrollX + mouseX}px`;
        }
    }

    ngOnInit(): void {
        this.el = this.elRef.nativeElement;
    }
}
