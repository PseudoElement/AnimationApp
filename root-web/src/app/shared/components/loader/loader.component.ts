import { Component, Input } from '@angular/core';
import { BackdropSizes } from '../backdrop/model';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
    @Input() isOpen: boolean = false;
    @Input() backdropSize: BackdropSizes = 'fullscreen';
}
