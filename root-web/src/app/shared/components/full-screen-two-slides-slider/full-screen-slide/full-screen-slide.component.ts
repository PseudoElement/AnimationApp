import { Component, Input } from '@angular/core';
import { SidesX } from 'src/app/core';

@Component({
    selector: 'app-full-screen-slide',
    templateUrl: './full-screen-slide.component.html',
    styleUrls: ['./full-screen-slide.component.scss'],
})
export class FullScreenSlideComponent {
    @Input() title: string = '';
    @Input() isActive: boolean = false;
    @Input() side: SidesX = 'left';
}
