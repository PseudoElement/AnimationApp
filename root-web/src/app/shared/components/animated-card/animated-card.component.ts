import { Component, ElementRef, ViewChild, Input, OnDestroy, HostBinding, AfterViewInit } from '@angular/core';
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
    ],
})
export class AnimatedCardComponent implements OnDestroy, AfterViewInit {
    @Input() once: boolean = false;
    @Input() showAnimationType: keyof typeof AnimationTypes = 'fadeUp';
    @Input() hideAnimationType: keyof typeof AnimationTypes = 'fadeDown';
    @ViewChild('elRef') elRef?: ElementRef;
    @HostBinding('style.opacity') opacity = 0;
    @HostBinding('style.transition') transition = 'opacity 1s';
    el!: HTMLElement;
    shouldShow: boolean = false;
    shouldHide: boolean = true;
    sub: Subscription;
    showYPoint!: number;

    constructor() {
        this.sub = fromEvent(window, 'wheel')
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
        setTimeout(
            () => (this.showYPoint = this.el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 1.3),
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
