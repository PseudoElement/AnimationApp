import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appOpacity]',
})
export class OpacityDirective {
    prevScrollPos: number = 0;
    element: HTMLElement;

    constructor(private el: ElementRef) {
        this.element = this.el.nativeElement;
    }

    @HostBinding('style.opacity') opacity: number = 0;
    @HostListener('window:scroll') onWindowScroll() {
        let currentScrollPos = window.scrollY;
        if (this.prevScrollPos < currentScrollPos && this.shouldChangeOpacity(currentScrollPos) && this.opacity < 1)
            this.opacity += 0.025;
        if (this.prevScrollPos > currentScrollPos && this.shouldChangeOpacity(currentScrollPos) && this.opacity > 0)
            this.opacity -= 0.025;
        this.prevScrollPos = currentScrollPos;
    }

    private topAnimationPoint(): number {
        return window.scrollY + this.element.getBoundingClientRect().top - window.innerHeight;
    }
    private bottomAnimationPoint(): number {
        return window.scrollY + this.element.getBoundingClientRect().bottom;
    }
    private shouldChangeOpacity(scrollPos: number): boolean {
        return scrollPos > this.topAnimationPoint() && scrollPos < this.bottomAnimationPoint();
    }
}
