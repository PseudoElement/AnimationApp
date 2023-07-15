import { Directive, OnInit, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appOnInit]',
})
export class OnInitDirective implements OnInit {
    @Output() onInit: EventEmitter<void> = new EventEmitter();
    constructor() {}

    ngOnInit(): void {
        this.onInit.emit();
    }
}
