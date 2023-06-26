import { Observable } from 'rxjs';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMessage, IMessageFromServer } from 'src/app/core';
import { ChatService } from 'src/app/core/services/chat.service';
import { selectMessages } from 'src/app/core/store/chat';
import { AppState } from 'src/app/core/store/store';
import { selectUserName } from 'src/app/core/store/user';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
    messages: IMessageFromServer[] = [];
    inputText: string = '';
    authorName: string = '';

    @ViewChild('inputNgModel') inputNgModel!: NgModel;

    constructor(private chatService: ChatService, private store: Store<AppState>) {
        this.store.select(selectUserName).subscribe((name) => (this.authorName = name as string));
        this.store.select(selectMessages).subscribe((messages) => (this.messages = messages));
    }

    public onSubmit() {
        this.chatService.sendMessage({
            author: this.authorName,
            createdAt: new Date(),
            id: crypto.randomUUID(),
            text: this.inputText,
        });
        this.inputText = '';
        this.inputNgModel.control.reset();
        console.log('INPUTETXT', this.inputText);
    }
}
