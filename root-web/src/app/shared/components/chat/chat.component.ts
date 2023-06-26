import { Component } from '@angular/core';
import { IMessage } from 'src/app/core';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
    messages: IMessage[] = [];
}
