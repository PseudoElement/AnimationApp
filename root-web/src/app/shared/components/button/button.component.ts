import { Component, Input, HostListener } from '@angular/core';
import { ButtonClassNames } from 'src/app/core';
import { SymbolNames } from '../arrow/model';
import { ButtonTypes } from './model';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() className: ButtonClassNames = '';
    @Input() withArrow: boolean = false;
    @Input() symbolName?: SymbolNames = 'east';
    @Input() disabled?: boolean = false;
    @Input() type: ButtonTypes = 'submit';
    isHover = false;
    @HostListener('mouseenter') onHover() {
        this.isHover = true;
    }
    @HostListener('mouseleave') onLeave() {
        this.isHover = false;
    }
}
