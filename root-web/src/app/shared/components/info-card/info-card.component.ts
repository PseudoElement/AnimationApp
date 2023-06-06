import { Component, Input } from '@angular/core';
import { IInfoCard } from 'src/app/core';
import { InfoCardTypes } from './model';

@Component({
    selector: 'app-info-card',
    templateUrl: './info-card.component.html',
    styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
    @Input() data!: IInfoCard;
    @Input() type: InfoCardTypes = 'developer';
}
