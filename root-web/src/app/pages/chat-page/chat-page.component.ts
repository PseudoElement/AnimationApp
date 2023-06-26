import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnDestroy {
    constructor(private chatService: ChatService) {}

    ngOnDestroy(): void {}
}
