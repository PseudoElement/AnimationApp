import { Component, Input } from '@angular/core';
import { HeaderLink } from 'src/app/core';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
    @Input() links: HeaderLink[] = [];
}
