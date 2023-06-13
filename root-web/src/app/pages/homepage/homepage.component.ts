import { Subscription } from 'rxjs';
import { footerSvgNames } from './../../core/constants/homepage';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { IHomePageData, randomPhotos, scrollToStart } from 'src/app/core';
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

    constructor(private homepageService: HomepageService, private screenSizeService: ScreenSizeService) {
        this.homepageService.getHomePageData().subscribe((data) => (this.data = data));
        this.sizeSub = this.screenSizeService.getSizes().subscribe((screen) => {
            console.log(screen.width);
            if (screen.width > 1368) {
                this.runningLineImgSize = 170;
            } else {
                console.log('ELSE');
                this.runningLineImgSize = 135;
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
