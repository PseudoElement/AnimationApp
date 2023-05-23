import { Directive, HostListener, Input } from '@angular/core';
import { ISkipEventSettings } from 'src/app/core';

@Directive({
    selector: '[skipEventBehaviour]',
})
export class SkipEventBehaviourDirective {
    @Input() settings: ISkipEventSettings = { preventDefault: true, stopPropagation: true };

    @HostListener('click', ['$event']) onClick($event: Event) {
        this.settings.preventDefault && $event.preventDefault();
        this.settings.stopPropagation && $event.stopPropagation();
    }
}
