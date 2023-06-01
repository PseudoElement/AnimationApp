import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    AfterViewInit,
    ChangeDetectorRef,
} from '@angular/core';
import { OpacityTypes } from 'src/app/core';

@Directive({
    selector: '[appOpacity]',
})
export class OpacityDirective implements AfterViewInit {
    @Input() type: OpacityTypes = 'by0.2';
    prevScrollPos: number = 0;
    element: HTMLElement;
    topYCoord!: number;

    constructor(private el: ElementRef, private cd: ChangeDetectorRef) {
        this.element = this.el.nativeElement;
    }

    @HostBinding('style.opacity') opacity: number = 0;
    @HostBinding('style.transition') transition?: string;
    @HostListener('window:wheel') onWindowScroll() {
        let currentScrollPos = window.scrollY;
        switch (this.type) {
            case 'by0.2':
                if (
                    this.prevScrollPos < currentScrollPos &&
                    this.shouldChangeOpacity(currentScrollPos) &&
                    this.opacity < 1
                )
                    this.opacity += 0.2;

                if (
                    this.prevScrollPos > currentScrollPos &&
                    this.shouldChangeOpacity(currentScrollPos) &&
                    this.opacity > 0
                )
                    this.opacity -= 0.2;

                break;
            case 'instant':
                if (this.shouldChangeOpacity(currentScrollPos)) {
                    this.opacity = 1;
                } else {
                    this.opacity = 0;
                }
                break;
        }
        this.prevScrollPos = currentScrollPos;
    }

    ngAfterViewInit() {
        setTimeout(() => (this.topYCoord = window.scrollY + this.element.getBoundingClientRect().top), 0);
        this.transition = this.type === 'by0.2' ? 'none' : 'all 0.3s';
        this.cd.detectChanges();
    }

    private topAnimationPoint(): number {
        return this.type === 'by0.2' ? this.topYCoord - window.innerHeight : this.topYCoord - window.innerHeight / 2;
    }
    private bottomAnimationPoint(): number {
        return window.scrollY + this.element.getBoundingClientRect().bottom;
    }
    private shouldChangeOpacity(scrollPos: number): boolean {
        if (this.type === 'instant') {
            return scrollPos > this.topAnimationPoint();
        } else {
            return scrollPos > this.topAnimationPoint() && scrollPos < this.bottomAnimationPoint();
        }
    }
}
