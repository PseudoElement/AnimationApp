import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
    @Output() closeModal = new EventEmitter();

    public onClose() {
        this.closeModal.emit();
    }
}
