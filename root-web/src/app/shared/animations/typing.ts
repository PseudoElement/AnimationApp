import { style, animate, trigger, transition, state } from '@angular/animations';

export const typingAnimation = (durationMS: number) =>
    trigger('typingAnimation', [
        state('start', style({ width: '0' })),
        state('end', style({ width: '105%' })),
        transition('start => end', animate(`${durationMS}ms`)),
    ]);
