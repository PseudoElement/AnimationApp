import { Component, EventEmitter, Input, Output } from '@angular/core';
import { zoomInOnEnterAnimation } from 'angular-animations';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
    animations: [zoomInOnEnterAnimation({ duration: 500 })],
})
export class TabComponent {
    @Input() title: string = '';
    @Input() id!: string;
    @Input() isOpen: boolean = false;
    @Output() setOpenTab = new EventEmitter<string>();
}
