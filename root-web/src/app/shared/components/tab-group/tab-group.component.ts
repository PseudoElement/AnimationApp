import { Component } from '@angular/core';

@Component({
    selector: 'app-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent {
    openTab?: string;

    public setOpenTab(id: string) {
        this.openTab = id;
    }
}
