import { animate, style, transition, trigger } from '@angular/animations';

export const opacityAnimation = (delayMS: number = 250) =>
    trigger('opacityAnimation', [
        transition(':enter', [style({ opacity: 0 }), animate(`${delayMS}ms`, style({ opacity: 1 }))]),
        transition(':leave', [animate(`${delayMS}ms`, style({ opacity: 0 }))]),
    ]);
