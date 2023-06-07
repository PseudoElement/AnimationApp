import { Component, Input } from '@angular/core';
import { IApplicationCard, IGameCard, IInfoCard } from 'src/app/core';
import { InfoCardTypes } from './model';

@Component({
    selector: 'app-info-card',
    templateUrl: './info-card.component.html',
    styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
    @Input() developerData?: IInfoCard;
    @Input() appData?: IApplicationCard;
    @Input() type: InfoCardTypes = 'developer';
    isCardRotated: boolean = false;
}
