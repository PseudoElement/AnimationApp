import { Component, Inject, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { ModalService } from './core/services/modal.service';
import { AuthService } from './core/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private themeService: ThemeService,
        public modalService: ModalService,
        @Inject(AuthService) public authService: AuthService
    ) {}

    ngOnInit(): void {
        this.themeService.initTheme();
    }
}
