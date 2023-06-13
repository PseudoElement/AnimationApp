import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appRotateZ]',
})
export class RotateZDirective {
    @Input() rotateAngle: number = 180;
    @Input() startAngle: number = 0;
    @Input() previousTransformStyle?: string = '';
    prevScrollPos: number;
    el: HTMLElement;
    constructor(private elRef: ElementRef) {
        this.prevScrollPos = 0;
        this.el = this.elRef.nativeElement as HTMLElement;
        this.el.style.transition = 'transform 300ms';
    }
    @HostListener('window:scroll') onScroll() {
        let currentScrollPos = window.scrollY;
        if (this.prevScrollPos < currentScrollPos) {
            this.el.style.transform = this.previousTransformStyle + `rotateZ(${this.startAngle}deg)`;
        } else {
            this.el.style.transform = this.previousTransformStyle + `rotateZ(${this.rotateAngle}deg)`;
        }
        this.prevScrollPos = currentScrollPos;
    }
}
