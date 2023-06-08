import { Component, Input } from '@angular/core';
import { BackdropSizes } from './model';

@Component({
    selector: 'app-backdrop',
    templateUrl: './backdrop.component.html',
    styleUrls: ['./backdrop.component.scss'],
})
export class BackdropComponent {
    @Input() isOpen: boolean = false;
    @Input() backdropSize?: BackdropSizes = 'fullscreen';
}
