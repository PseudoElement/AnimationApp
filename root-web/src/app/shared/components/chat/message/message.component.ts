import { Component, Input } from '@angular/core';
import { IMessageFromServer } from 'src/app/core';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
    @Input() data!: IMessageFromServer;
}
