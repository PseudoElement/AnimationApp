import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { zoomInOnEnterAnimation } from 'angular-animations';
import { IDeveloper, scrollToStart } from 'src/app/core';
import { DeveloperService } from 'src/app/core/services/developer.service';

@Component({
    selector: 'app-developer',
    templateUrl: './developer.component.html',
    styleUrls: ['./developer.component.scss'],
    animations: [zoomInOnEnterAnimation({ duration: 300 })],
})
export class DeveloperComponent implements AfterViewInit {
    data?: IDeveloper;
    id: string;
    constructor(private developerService: DeveloperService, private route: ActivatedRoute) {
        this.id = this.route.snapshot.params.id;
        this.developerService.getDeveloper(this.id).subscribe((dev) => {
            this.data = dev;
        });
    }
    ngAfterViewInit(): void {
        scrollToStart();
    }
}
