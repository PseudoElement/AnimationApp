import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appRotateX]',
})
export class RotateXDirective implements AfterViewInit {
    el: HTMLElement;
    child!: HTMLElement;
    constructor(private elRef: ElementRef) {
        this.el = this.elRef.nativeElement;
    }
    @HostListener('mouseenter') onHover() {
        this.child.style.transform = 'rotateY(180deg)';
    }
    @HostListener('mouseleave') onLeave() {
        this.child.style.transform = 'rotateY(0deg)';
    }
    ngAfterViewInit() {
        this.child = this.el.childNodes[0] as HTMLElement;
        this.child.style.transition = 'all 1s';
    }
}
