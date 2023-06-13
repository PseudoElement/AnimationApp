import { Component, Input } from '@angular/core';
import { ScreenSizeService } from 'src/app/core/services/screen-size.service';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
    @Input() logoSize: number = 85;
    constructor() {}
}
