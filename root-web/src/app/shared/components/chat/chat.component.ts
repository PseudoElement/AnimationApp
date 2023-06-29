import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMessageInStore } from 'src/app/core';
import { ChatService } from 'src/app/core/services/chat.service';
import { selectMessages } from 'src/app/core/store/chat';
import { AppState } from 'src/app/core/store/store';
import { selectUserEmail } from 'src/app/core/store/user';
import { fadeInLeftOnEnterAnimation, fadeInRightOnEnterAnimation } from 'angular-animations';
import { tap } from 'rxjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    animations: [fadeInRightOnEnterAnimation({ duration: 300 }), fadeInLeftOnEnterAnimation({ duration: 300 })],
})
export class ChatComponent {
    messages: IMessageInStore[] = [];
    inputText: string = '';
    authorEmail: string = '';
    isMessageCooldown: boolean = false;
    messagesWrapper?: HTMLElement | null;

    constructor(private chatService: ChatService, private store: Store<AppState>) {
        this.store.select(selectUserEmail).subscribe((email) => (this.authorEmail = email as string));
        this.store
            .select(selectMessages)
            .pipe(
                tap(() => {
                    this.messagesWrapper && this._scrollChatToLastMessage();
                })
            )
            .subscribe((messages) => (this.messages = messages));
    }

    public onSubmit() {
        if (this.isMessageCooldown) return;
        this.chatService.sendMessage({
            authorEmail: this.authorEmail,
            createdAt: new Date(),
            id: crypto.randomUUID(),
            text: this.inputText,
        });
        this.inputText = '';
        this.isMessageCooldown = true;
        if (!this.messagesWrapper) this.messagesWrapper = document.querySelector('.messages');
        setTimeout(() => {
            this.isMessageCooldown = false;
        }, 1000);
    }

    private _scrollChatToLastMessage(): void {
        this.messagesWrapper?.scrollTo({
            behavior: 'smooth',
            top: this.messagesWrapper.scrollHeight + this.messagesWrapper.getBoundingClientRect().bottom + 550,
        });
    }

    log(e: any) {
        console.log(e);
    }
}
