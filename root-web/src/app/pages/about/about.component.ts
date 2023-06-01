import { Component, OnInit } from '@angular/core';
import { IInfoCard } from 'src/app/core';
import { AboutService } from 'src/app/core/services/about.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
    cards: IInfoCard[] = [];
    teamPhoto: string = '../../../assets/img/png/Developers.png';
    constructor(private aboutService: AboutService) {}

    ngOnInit(): void {
        this.aboutService.getAbout().subscribe((res) => {
            this.cards = res.cards;
            this.teamPhoto = res.teamPhoto;
            console.log(this.teamPhoto);
        });
    }
    click(e: Event) {
        console.log((e.target as HTMLElement).offsetLeft);
    }
}
