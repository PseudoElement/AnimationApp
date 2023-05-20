import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Directions } from 'src/app/core';

@Directive({
    selector: '[appParallax]',
})
export class ParallaxDirective {
    @Input() ratio: number = 1;
    @Input() dir: Directions = 'vertical';
    initialTop: number = 0;
    initialLeft: number = 0;

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        const computedStyles = window.getComputedStyle(this.el.nativeElement);
        this.initialTop = parseInt(computedStyles.top);
        this.initialLeft = parseInt(computedStyles.left);
    }

    @HostListener('window:scroll')
    onWindowScroll() {
        if (this.dir === 'vertical') {
            this.el.nativeElement.style.top = this.initialTop - window.scrollY * this.ratio + 'px';
        } else {
            this.el.nativeElement.style.left = this.initialLeft - window.scrollY * this.ratio + 'px';
        }
    }
}
