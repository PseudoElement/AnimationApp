import { Component, Input } from '@angular/core';
import { ButtonClassNames } from 'src/app/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() className: ButtonClassNames = '';
    @Input() withArrow: boolean = false;
}
