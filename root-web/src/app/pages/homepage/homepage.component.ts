import { Component } from '@angular/core';
import { randomPhotos } from 'src/app/core';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
    images = randomPhotos;

    public getStartCoordYForElBelowTarget(target: Element): number {
        return parseInt(window.getComputedStyle(target).top);
    }
    public getNewCoordYForElBelowTarget(target: Element) {
        const compStyles = window.getComputedStyle(target);
        return parseInt(compStyles.top) + parseInt(compStyles.height);
    }
}
