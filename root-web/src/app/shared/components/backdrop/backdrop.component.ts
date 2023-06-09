import { Component, Input } from '@angular/core';
import { BackdropSizes } from './model';
import { opacityAnimation } from '../../animations';

@Component({
    selector: 'app-backdrop',
    templateUrl: './backdrop.component.html',
    styleUrls: ['./backdrop.component.scss'],
    animations: [opacityAnimation],
})
export class BackdropComponent {
    @Input() isOpen: boolean = false;
    @Input() backdropSize?: BackdropSizes = 'fullscreen';
}
