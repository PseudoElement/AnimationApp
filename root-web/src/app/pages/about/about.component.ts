import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { slideInLeftOnEnterAnimation } from 'angular-animations';
import { Subscription } from 'rxjs';
import { AnimationTypes, IInfoCard, MAX_LAPTOP_WIDTH, MAX_TABLET_WIDTH, scrollToStart } from 'src/app/core';
import { AboutService } from 'src/app/core/services/about.service';
import { ScreenSizeService } from 'src/app/core/services/screen-size.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [slideInLeftOnEnterAnimation({ duration: 300 })],
})
export class AboutComponent implements AfterViewInit, OnDestroy {
    cards: IInfoCard[] = [];
    cardXPos: number = 100;
    sizeSub: Subscription;
    constructor(private aboutService: AboutService, private screenSizeService: ScreenSizeService) {
        this.aboutService.getAbout().subscribe((res) => {
            this.cards = res;
            console.log(res);
        });
        this.sizeSub = this.screenSizeService.getSizes().subscribe((screen) => {
            if (screen.width > MAX_LAPTOP_WIDTH) {
                this.cardXPos = 100;
            } else if (screen.width > MAX_TABLET_WIDTH) {
                this.cardXPos = -50;
            } else {
                this.cardXPos = 0;
            }
        });
    }

    ngAfterViewInit(): void {
        scrollToStart();
    }
    ngOnDestroy(): void {
        this.sizeSub.unsubscribe();
    }
    get AnimationTypes() {
        return AnimationTypes;
    }
}
