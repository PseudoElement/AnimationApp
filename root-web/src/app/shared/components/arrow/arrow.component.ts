import { Component, Input } from '@angular/core';
import { SymbolNames } from './model';

@Component({
    selector: 'app-arrow',
    templateUrl: './arrow.component.html',
    styleUrls: ['./arrow.component.scss'],
})
export class ArrowComponent {
    @Input() isVisible: boolean = false;
    @Input() symbolName: SymbolNames = 'east';
}
