import { Injectable } from '@angular/core';
import { IModal, ModalTypes } from '../model';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    modals: IModal[] = [];
    constructor() {}
    public toggleVisibility(id: ModalTypes) {
        const modal = this.modals.find((modal) => modal.id === id) as IModal;
        modal.isVisible = !modal.isVisible;
    }
    public isVisible(id: ModalTypes) {
        const modal = this.modals.find((modal) => modal.id === id);
        return modal ? modal.isVisible : false;
    }
    public register(id: ModalTypes) {
        this.modals.push({ isVisible: false, id: id });
    }
    public unregister(id: ModalTypes) {
        this.modals = this.modals.filter((modal) => modal.id !== id);
    }
}
