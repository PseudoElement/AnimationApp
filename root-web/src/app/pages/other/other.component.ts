import { Component } from '@angular/core';
import { segments } from 'src/app/core';

@Component({
    selector: 'app-other',
    templateUrl: './other.component.html',
    styleUrls: ['./other.component.scss'],
})
export class OtherComponent {
    segments = segments;
}
