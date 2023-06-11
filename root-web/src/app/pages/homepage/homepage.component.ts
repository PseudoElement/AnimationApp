import { footerSvgNames } from './../../core/constants/homepage';
import { AfterViewInit, Component } from '@angular/core';
import { IHomePageData, randomPhotos, scrollToStart } from 'src/app/core';
import { HomepageService } from 'src/app/core/services/homepage.service';
import { SvgNames } from 'src/app/shared/components/svg/model';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
    images = randomPhotos;
    data?: IHomePageData;
    footerSvgNames: SvgNames[] = footerSvgNames;

    constructor(private homepageService: HomepageService) {
        this.homepageService.getHomePageData().subscribe((data) => (this.data = data));
    }

    ngAfterViewInit(): void {
        scrollToStart();
    }

    public getStartCoordYForElBelowTarget(target: Element): number {
        return parseInt(window.getComputedStyle(target).top);
    }
    public getNewCoordYForElBelowTarget(target: Element) {
        const compStyles = window.getComputedStyle(target);
        return parseInt(compStyles.top) + parseInt(compStyles.height);
    }
}
