import { Component, OnInit } from '@angular/core';
import { AnimationTypes, IInfoCard } from 'src/app/core';
import { AboutService } from 'src/app/core/services/about.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
    cards: IInfoCard[] = [];
    teamPhoto: string = '';
    paddingLeft!: number;
    constructor(private aboutService: AboutService) {}

    ngOnInit(): void {
        this.paddingLeft = window.innerWidth * 0.1;
        this.aboutService.getAbout().subscribe((res) => {
            this.cards = res.cards;
            this.teamPhoto = res.teamPhoto;
        });
    }
    get AnimationTypes() {
        return AnimationTypes;
    }
}
