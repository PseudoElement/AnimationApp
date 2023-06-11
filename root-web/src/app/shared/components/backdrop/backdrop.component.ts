import { Component, Input } from '@angular/core';
import { opacityAnimation } from '../../animations';

@Component({
    selector: 'app-backdrop',
    templateUrl: './backdrop.component.html',
    styleUrls: ['./backdrop.component.scss'],
    animations: [opacityAnimation],
})
export class BackdropComponent {
    @Input() isOpen: boolean = false;
}
