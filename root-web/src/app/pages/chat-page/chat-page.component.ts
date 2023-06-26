import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit, OnDestroy {
    constructor(private chatService: ChatService) {}

    ngOnInit(): void {
        this.chatService.connect();
    }

    ngOnDestroy(): void {
        this.chatService.disconnect();
    }
}
