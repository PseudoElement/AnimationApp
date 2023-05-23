import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
    @Input() title: string = '';
    @Input() id!: string;
    @Input() isOpen: boolean = false;
    @Output() setOpenTab = new EventEmitter<string>();
}
