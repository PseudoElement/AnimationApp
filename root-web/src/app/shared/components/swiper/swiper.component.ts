import { BehaviorSubject, Subject, takeUntil, Subscription, interval } from 'rxjs';
import {
    Component,
    ElementRef,
    Input,
    AfterViewInit,
    OnDestroy,
    ViewChild,
    HostListener,
    ChangeDetectorRef,
    Output,
    EventEmitter,
} from '@angular/core';
import { IAutoPlay, ISlide } from './model';

@Component({
    selector: 'app-swiper',
    templateUrl: './swiper.component.html',
    styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements AfterViewInit, OnDestroy {
    @Input() hasNavigation: boolean = true;
    @Input() hasPagination: boolean = true;
    @Input() loop: boolean = true;
    @Input() isDraggable: boolean = true;
    @Input() auto: IAutoPlay = { delay: 3000, disableOnInteraction: false, stopOnHover: true };
    slides: ISlide[] = [];
    activeSlide$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    isDestroyed$: Subject<boolean> = new Subject();
    isSliding: boolean = false;
    @ViewChild('swiperRef') swiperRef!: ElementRef;
    swiper!: HTMLElement;
    autoPlayIntervalID?: number;
    clientXOnActionStart: number = 0;
    nodesArray!: HTMLElement[];

    @HostListener('mouseover') onHover() {
        if (this.auto && this.auto.stopOnHover) {
            clearInterval(this.autoPlayIntervalID);
        }
    }
    @HostListener('mouseout') onLeave() {
        if (this.auto && !this.auto.disableOnInteraction) {
            this._autoplay(this.auto.delay);
        }
    }

    @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent): void {
        if (!this.isDraggable) return;
        this.clientXOnActionStart = event.clientX;
    }

    @HostListener('mouseup', ['$event']) onMouseUp(event: MouseEvent): void {
        if (!this.isDraggable || this.clientXOnActionStart === event.clientX) return;
        else if (this.clientXOnActionStart > event.clientX) this.nextSlide();
        else this.prevSlide();
    }

    @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent): void {
        this.clientXOnActionStart = event.changedTouches.item(0)?.clientX ?? 0;
    }
    @HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent): void {
        if (this.clientXOnActionStart > event.changedTouches.item(0)!.clientX) this.nextSlide();
        else this.prevSlide();
    }

    constructor(private cd: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.swiper = this.swiperRef.nativeElement;
        this._setSlidesArray();
        this.cd.detectChanges();
        this._initObservableOnSlideChange();
        if (this.auto) {
            this._autoplay(this.auto.delay);
        }
    }
    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
        this.isDestroyed$.complete();
        this.autoPlayIntervalID && clearInterval(this.autoPlayIntervalID);
    }

    public nextSlide() {
        if (this.isSliding) return;
        if (this.activeSlide$.value === this.slides.length) this.activeSlide$.next(1);
        else this.activeSlide$.next(this.activeSlide$.value + 1);
    }

    public prevSlide() {
        if (this.isSliding) return;
        if (this.activeSlide$.value === 1) this.activeSlide$.next(this.slides.length);
        else this.activeSlide$.next(this.activeSlide$.value - 1);
    }

    public setActiveSlide(count: number) {
        this.activeSlide$.next(count);
    }

    private _initObservableOnSlideChange(): Subscription {
        return this.activeSlide$.pipe(takeUntil(this.isDestroyed$)).subscribe((count) => {
            const slide = this._findSlideToScroll(count);
            if (!slide) return;
            this.isSliding = true;
            this.swiper.scroll({ behavior: 'smooth', left: slide.offsetLeft });
            setTimeout(() => (this.isSliding = false), 500);
        });
    }

    private _autoplay(ms: number): void {
        this.autoPlayIntervalID = setInterval(() => this.nextSlide(), ms) as any;
    }

    private _findSlideToScroll(count: number): ISlide {
        return this.slides.find((slide) => slide.count === count) ?? this.slides[0];
    }

    private _setSlidesArray(): HTMLElement[] {
        const nodesArray = Array.from(this.swiper.querySelectorAll('.slide')) as HTMLElement[];
        this.slides = nodesArray.map((el, index) => ({ count: index + 1, node: el, offsetLeft: el.offsetLeft }));
        return nodesArray;
    }
}
