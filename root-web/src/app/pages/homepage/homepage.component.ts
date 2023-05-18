import { Component } from '@angular/core';
import { randomPhotos } from 'src/app/core';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
    images = randomPhotos;
}
