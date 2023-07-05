import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IMessageInStore } from 'src/app/core';
import { ChatService } from 'src/app/core/services/chat.service';
import { ChatActions, selectIsOpenChat, selectMessages } from 'src/app/core/store/chat';
import { AppState } from 'src/app/core/store/store';
import { selectUserEmail } from 'src/app/core/store/user';
import { fadeInLeftOnEnterAnimation, fadeInRightOnEnterAnimation } from 'angular-animations';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    animations: [fadeInRightOnEnterAnimation({ duration: 300 }), fadeInLeftOnEnterAnimation({ duration: 300 })],
})
export class ChatComponent implements OnDestroy, OnInit {
    messages: IMessageInStore[] = [];
    inputText: string = '';
    authorEmail: string = '';
    isMessageCooldown: boolean = false;
    isDestroyed$: Subject<boolean> = new Subject();
    @ViewChild('messagesRef', { static: true }) messagesWrapperRef!: ElementRef;
    messagesWrapper!: HTMLElement;
    isOpenChat$: Observable<boolean>;

    constructor(private chatService: ChatService, private store: Store<AppState>) {
        this.chatService.getAllMessagesFromDB();
        this.isOpenChat$ = this.store.select(selectIsOpenChat);
        this.store
            .pipe(select(selectUserEmail), takeUntil(this.isDestroyed$))
            .subscribe((email) => (this.authorEmail = email as string));
        this.store
            .pipe(
                select(selectMessages),
                tap(() => this.messagesWrapper && this._scrollChatToLastMessage()),
                takeUntil(this.isDestroyed$)
            )
            .subscribe((messages) => (this.messages = messages));
    }

    ngOnInit(): void {
        this.messagesWrapper = this.messagesWrapperRef.nativeElement;
    }

    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
    }

    public onOpenChat() {
        this.store.dispatch(ChatActions.openChat());
    }

    public onSubmit() {
        if (this.isMessageCooldown) return;
        this.chatService.sendMessage({
            authorEmail: this.authorEmail,
            createdAt: new Date(),
            text: this.inputText,
        });
        this.inputText = '';
        this.isMessageCooldown = true;
        setTimeout(() => {
            this.isMessageCooldown = false;
        }, 1000);
    }

    private _scrollChatToLastMessage(): void {
        this.messagesWrapper.scrollTo({
            behavior: 'smooth',
            top: this.messagesWrapper.scrollHeight,
        });
    }
}
