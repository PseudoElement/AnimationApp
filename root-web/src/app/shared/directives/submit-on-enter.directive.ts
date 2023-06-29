import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { KeyCodes } from 'src/app/core';

@Directive({
    selector: '[appListenKeyClick]',
})
export class ListenKeyClickDirective {
    @Input() keyCode: KeyCodes = 'Enter';
    @Output() appListenKeyClick: EventEmitter<unknown> = new EventEmitter();
    @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
        e.code === this.keyCode && this.appListenKeyClick.emit();
    }
    constructor() {}
}
