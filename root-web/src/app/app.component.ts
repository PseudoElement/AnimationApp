import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { ModalService } from './core/services/modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private themeService: ThemeService, public modalService: ModalService) {}

    ngOnInit(): void {
        this.themeService.initTheme();
    }
}
