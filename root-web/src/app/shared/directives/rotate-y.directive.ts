import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[appRotateY]',
})
export class RotateYDirective implements AfterViewInit {
    @Input() isCardRotated: boolean = false;
    @Output() isCardRotatedChange: EventEmitter<boolean> = new EventEmitter(false);
    el: HTMLElement;
    child!: HTMLElement;
    transition: number = 1000;
    timeout?: ReturnType<typeof setTimeout>;
    constructor(private elRef: ElementRef) {
        this.el = this.elRef.nativeElement;
    }
    @HostListener('mouseenter') onHover() {
        this.child.style.transform = 'rotateY(180deg)';
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.isCardRotatedChange.emit(true), this.transition / 3);
    }
    @HostListener('mouseleave') onLeave() {
        this.child.style.transform = 'rotateY(0deg)';
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.isCardRotatedChange.emit(false), this.transition / 3);
    }
    ngAfterViewInit() {
        this.child = this.el.childNodes[0] as HTMLElement;
        this.child.style.transition = `all ${this.transition}ms`;
    }
}
