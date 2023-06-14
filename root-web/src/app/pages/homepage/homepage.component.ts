import { Subscription } from 'rxjs';
import { footerSvgNames } from './../../core/constants/homepage';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import {
    IHomePageData,
    MAX_LAPTOP_WIDTH,
    MAX_MOBILE_WIDTH,
    MAX_TABLET_WIDTH,
    randomPhotos,
    scrollToStart,
} from 'src/app/core';
import { HomepageService } from 'src/app/core/services/homepage.service';
import { ScreenSizeService } from 'src/app/core/services/screen-size.service';
import { SvgNames } from 'src/app/shared/components/svg/model';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit, OnDestroy {
    images = randomPhotos;
    data?: IHomePageData;
    footerSvgNames: SvgNames[] = footerSvgNames;
    sizeSub: Subscription;
    runningLineImgSize: number = 170;
    startPointRatioCollorfullWords: number = 10;

    constructor(private homepageService: HomepageService, private screenSizeService: ScreenSizeService) {
        this.homepageService.getHomePageData().subscribe((data) => (this.data = data));
        this.sizeSub = this.screenSizeService.getSizes().subscribe((screen) => {
            if (screen.width > MAX_LAPTOP_WIDTH) {
                this.runningLineImgSize = 170;
                this.startPointRatioCollorfullWords = 7;
            } else if (screen.width > MAX_MOBILE_WIDTH) {
                this.runningLineImgSize = 135;
                this.startPointRatioCollorfullWords = 15;
            } else {
                this.runningLineImgSize = 110;
                this.startPointRatioCollorfullWords = 17.5;
            }
        });
    }

    ngAfterViewInit(): void {
        scrollToStart();
    }

    ngOnDestroy(): void {
        this.sizeSub.unsubscribe();
    }

    public getStartCoordYForElBelowTarget(target: Element): number {
        return parseInt(window.getComputedStyle(target).top);
    }
    public getNewCoordYForElBelowTarget(target: Element) {
        const compStyles = window.getComputedStyle(target);
        return parseInt(compStyles.top) + parseInt(compStyles.height);
    }
}
