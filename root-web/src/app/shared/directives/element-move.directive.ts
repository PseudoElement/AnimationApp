import { Directive, Input, OnDestroy, ElementRef, AfterViewInit, HostBinding, ChangeDetectorRef } from '@angular/core';
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
    @Input() startCoordXTarget?: number = -800;
    @Input() newCoordXTarget: number | null = null;
    @Input() once?: boolean;
    @Input() transitionValue?: string;
    @Input() startPointRatio: number = 4;
    absoluteOffsetTopTarget: number | null = null;
    isDestroyed$: Subject<boolean> = new Subject();
    windowHeight: number;
    startAnimationPoint: number = 0;
    shouldShow$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    target: HTMLElement;

    @HostBinding('style.transition') transition = 'all 0.1s';

    constructor(private el: ElementRef, private cd: ChangeDetectorRef) {
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
        this.transition = this.transitionValue ?? 'all 0.1s';
        this.cd.detectChanges();
        setTimeout(() => (this.absoluteOffsetTopTarget = this.target.getBoundingClientRect().top + window.scrollY), 0);
        setTimeout(
            () =>
                (this.startAnimationPoint =
                    (this.absoluteOffsetTopTarget as number) - this.windowHeight / this.startPointRatio),
            0
        );
        fromEvent(document, 'scroll')
            .pipe(takeUntil(this.isDestroyed$))
            .subscribe(() => {
                if (window.scrollY >= this.startAnimationPoint && !this.shouldShow$.value) this.shouldShow$.next(true);
                if (window.scrollY <= this.startAnimationPoint && this.shouldShow$.value && !this.once)
                    this.shouldShow$.next(false);
            });
    }

    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
    }

    private changePositions(shouldShow: boolean): void {
        switch (this.direction) {
            case 'ltr':
                this.target.style.left = this.setCoordinateX(shouldShow);
                break;
            case 'rtl':
                this.target.style.right = this.setCoordinateX(shouldShow);
                break;
        }
        if (this.elBelowTarget) {
            this.elBelowTarget.style.top = shouldShow ? `${this.newCoordYElBelow}px` : `${this.startCoordYElBelow}px`;
        }
    }

    private setCoordinateX(shouldShow: boolean): string {
        return shouldShow ? `${this.newCoordXTarget}px` : `${this.startCoordXTarget}px`;
    }
}
