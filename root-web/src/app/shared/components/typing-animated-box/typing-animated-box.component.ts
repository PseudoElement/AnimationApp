import { Component } from '@angular/core';
import { typingAnimation } from '../../animations';

@Component({
    selector: 'app-typing-animated-box',
    templateUrl: './typing-animated-box.component.html',
    styleUrls: ['./typing-animated-box.component.scss'],
    animations: [typingAnimation(2500)],
})
export class TypingAnimatedBoxComponent {}
