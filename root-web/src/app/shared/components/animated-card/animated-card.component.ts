import {
    Component,
    ElementRef,
    ViewChild,
    Input,
    OnDestroy,
    HostBinding,
    AfterViewInit,
    ChangeDetectorRef,
} from '@angular/core';
import {
    fadeInRightAnimation,
    fadeOutRightAnimation,
    fadeInLeftAnimation,
    fadeOutLeftAnimation,
    fadeInUpAnimation,
    fadeOutUpAnimation,
    fadeInDownAnimation,
    fadeOutDownAnimation,
    bounceInRightAnimation,
    bounceOutRightAnimation,
    bounceInLeftAnimation,
    bounceOutLeftAnimation,
    shakeAnimation,
    pulseAnimation,
    flipAnimation,
    flipInXAnimation,
    flipOutXAnimation,
    flipInYAnimation,
    flipOutYAnimation,
    zoomInOnEnterAnimation,
    zoomOutAnimation,
    zoomInAnimation,
} from 'angular-animations';
import { Subscription, fromEvent } from 'rxjs';
import { AnimationTypes } from 'src/app/core';

@Component({
    selector: 'app-animated-card',
    templateUrl: './animated-card.component.html',
    styleUrls: ['./animated-card.component.scss'],
    animations: [
        fadeInRightAnimation({ duration: 1000 }),
        fadeOutRightAnimation({ duration: 1000 }),
        fadeInLeftAnimation({ duration: 1000 }),
        fadeOutLeftAnimation({ duration: 1000 }),
        fadeInUpAnimation({ duration: 1000 }),
        fadeOutUpAnimation({ duration: 1000 }),
        fadeInDownAnimation({ duration: 1000 }),
        fadeOutDownAnimation({ duration: 1000 }),
        bounceInRightAnimation({ duration: 1000 }),
        bounceOutRightAnimation({ duration: 1000 }),
        bounceInLeftAnimation({ duration: 1000 }),
        bounceOutLeftAnimation({ duration: 1000 }),
        shakeAnimation({ duration: 1000, direction: '<=>' }),
        pulseAnimation({ duration: 1000, direction: '<=>' }),
        flipAnimation({ duration: 1000 }),
        flipInXAnimation({ duration: 1000 }),
        flipOutXAnimation({ duration: 1000 }),
        flipInYAnimation({ duration: 1000 }),
        flipOutYAnimation({ duration: 1000 }),
        zoomInOnEnterAnimation(),
        zoomOutAnimation({ duration: 1000 }),
        zoomInAnimation({ duration: 1000 }),
    ],
})
export class AnimatedCardComponent implements OnDestroy, AfterViewInit {
    @Input() fromStart?: boolean = false;
    @Input() once: boolean = false;
    @Input() showAnimationType: keyof typeof AnimationTypes = 'fadeUp';
    @Input() hideAnimationType: keyof typeof AnimationTypes = 'fadeDown';
    @Input() ratioShowYPoint: number = 1.2;
    @ViewChild('elRef') elRef?: ElementRef;
    @HostBinding('style.opacity') opacity = 0;
    @HostBinding('style.transition') transition = 'opacity 1s';
    el!: HTMLElement;
    shouldShow: boolean = false;
    shouldHide: boolean = true;
    sub: Subscription;
    showYPoint!: number;

    constructor(private cd: ChangeDetectorRef) {
        this.fromStart && (this.opacity = 1);
        this.sub = fromEvent(window, 'scroll')
            .pipe()
            .subscribe(() => {
                if (window.scrollY > this.showYPoint) {
                    this.shouldShow = true;
                    this.shouldHide = false;
                    this.opacity = 1;
                } else if (this.once) return;
                else {
                    this.shouldShow = false;
                    this.shouldHide = true;
                    this.opacity = 0;
                }
            });
    }

    ngAfterViewInit(): void {
        this.el = this.elRef?.nativeElement;
        if (this.fromStart) {
            this.shouldShow = true;
            setTimeout(() => (this.opacity = 1), 0);
            this.cd.detectChanges();
        }
        setTimeout(
            () =>
                (this.showYPoint =
                    this.el.getBoundingClientRect().top + window.scrollY - window.innerHeight / this.ratioShowYPoint),
            0
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    get AnimationTypes() {
        return AnimationTypes;
    }
}
