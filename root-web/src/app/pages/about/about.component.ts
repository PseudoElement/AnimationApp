import { AfterViewInit, Component } from '@angular/core';
import { AnimationTypes, IInfoCard, scrollToStart } from 'src/app/core';
import { AboutService } from 'src/app/core/services/about.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
    cards: IInfoCard[] = [];
    teamPhoto: string = '';
    paddingLeft!: number;
    constructor(private aboutService: AboutService) {
        this.aboutService.getAbout().subscribe((res) => {
            this.cards = res.cards;
            this.teamPhoto = res.teamPhoto;
        });
    }

    ngAfterViewInit(): void {
        this.paddingLeft = window.innerWidth * 0.1;
        scrollToStart();
    }
    get AnimationTypes() {
        return AnimationTypes;
    }
}
