import { Component, Input } from '@angular/core';
import { SvgNames } from './model';

@Component({
    selector: 'app-svg',
    templateUrl: './svg.component.html',
    styleUrls: ['./svg.component.scss'],
})
export class SvgComponent {
    @Input() name!: SvgNames;
}
