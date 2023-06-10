import { animate, style, transition, trigger } from '@angular/animations';

export const showHideAnimation = (height: number) =>
    trigger('showHideAnimation', [
        transition(':enter', [style({ height: 0 }), animate('250ms', style({ height }))]),
        transition(':leave', [animate('250ms', style({ height: 0 }))]),
    ]);
