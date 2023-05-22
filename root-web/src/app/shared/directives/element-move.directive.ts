import { Directive, Input, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { Subject, fromEvent, takeUntil, BehaviorSubject } from 'rxjs';
import { DirectionsX } from 'src/app/core';

@Directive({
    selector: '[appElementMove]',
})
export class ElementMoveDirective implements AfterViewInit, OnDestroy {
    @Input() elBelowTarget?: HTMLElement;
    @Input() newCoordYElBelow?: number;
    @Input() startCoordYElBelow?: number;
    @Input() direction!: DirectionsX; //obligate property
    @Input() startCoordXTarget: number = -600;
    @Input() newCoordXTarget: number | null = null;
    absoluteOffsetTopTarget: number | null = null;
    isDestroyed$: Subject<boolean> = new Subject();
    windowHeight: number;
    startAnimationPoint: number = 0;
    shouldShow$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    target: HTMLElement;

    constructor(private el: ElementRef) {
        this.windowHeight = window.innerHeight;
        this.target = this.el.nativeElement;
        fromEvent(window, 'resize')
            .pipe(takeUntil(this.isDestroyed$))
            .subscribe(() => {
                this.windowHeight = window.innerHeight;
            });
        this.shouldShow$.pipe(takeUntil(this.isDestroyed$)).subscribe((shouldShow) => {
            this.changePositions(shouldShow);
        });
    }

    ngAfterViewInit(): void {
        this.absoluteOffsetTopTarget = this.target.getBoundingClientRect().top + window.scrollY;
        this.startAnimationPoint = (this.absoluteOffsetTopTarget as number) - this.windowHeight / 2;
        let prevScrollpos = window.scrollY;
        fromEvent(document, 'scroll')
            .pipe(takeUntil(this.isDestroyed$))
            .subscribe(() => {
                let currentScrollPos = window.scrollY;
                if (window.scrollY >= this.startAnimationPoint && !this.shouldShow$.value) this.shouldShow$.next(true);
                if (window.scrollY <= this.startAnimationPoint && this.shouldShow$.value) this.shouldShow$.next(false);
                prevScrollpos = currentScrollPos;
            });
    }

    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
    }

    private changePositions(shouldShow: boolean): void {
        switch (this.direction) {
            case 'ltr':
                this.target.style.left = shouldShow ? `${this.newCoordXTarget}px` : `${this.startCoordXTarget}px`;
                break;
            case 'rtl':
                this.target.style.right = shouldShow ? `${this.newCoordXTarget}px` : `${this.startCoordXTarget}px`;
                break;
        }
        if (this.elBelowTarget) {
            this.elBelowTarget.style.top = shouldShow ? `${this.newCoordYElBelow}px` : `${this.startCoordYElBelow}px`;
        }
    }
}
