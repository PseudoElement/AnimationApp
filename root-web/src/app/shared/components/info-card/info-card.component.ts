import { Component, Input } from '@angular/core';
import { IInfoCard } from 'src/app/core';

@Component({
    selector: 'app-info-card',
    templateUrl: './info-card.component.html',
    styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
    @Input() data!: IInfoCard;
}
