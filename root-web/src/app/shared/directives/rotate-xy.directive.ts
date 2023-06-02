import { Directive, HostListener, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[appRotateXY]',
})
export class RotateXYDirective {
    @Input() perspective: number = 150;
    target: HTMLElement;
    constructor(private el: ElementRef) {
        this.target = this.el.nativeElement;
    }

    @HostBinding('style.transform') transform: string | null = null;
    @HostListener('mousemove', ['$event']) onHover(e: Event) {
        const { clientX, clientY } = e as MouseEvent;
        const clientRect = this.target.getBoundingClientRect();
        const center = {
            x: clientRect.left + clientRect.width / 2,
            y: clientRect.top + clientRect.height / 2,
        };
        const deltaX = clientX - center.x;
        const deltaY = clientY - center.y;
        const tiltX = deltaY / (clientRect.height / 2);
        const tiltY = -deltaX / (clientRect.width / 2);
        this.transform = `perspective(${this.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
    @HostListener('mouseleave') onLeave() {
        this.transform = null;
    }
}
