import { Component } from '@angular/core';
import { TabNames } from 'src/app/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
    selector: 'app-auth-modal',
    templateUrl: './auth-modal.component.html',
    styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent {
    openTab: TabNames = 'signIn';

    constructor(public modalService: ModalService) {}
    ngOnInit() {
        this.modalService.register('auth');
    }
    ngOnDestroy() {
        this.modalService.unregister('auth');
    }

    public setOpenTab(tab: string) {
        this.openTab = tab as TabNames;
    }
}
