import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SidesX } from 'src/app/core';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
    selector: 'app-full-screen-slide',
    templateUrl: './full-screen-slide.component.html',
    styleUrls: ['./full-screen-slide.component.scss'],
})
export class FullScreenSlideComponent {
    @Input() title: string = '';
    @Input() isActive: boolean = false;
    @Input() side: SidesX = 'left';
    isHoverToggleBar: boolean = false;
    isVisibleHeader$: BehaviorSubject<boolean>;
    constructor(private headerService: HeaderService) {
        this.isVisibleHeader$ = this.headerService.isVisible$;
    }
}
