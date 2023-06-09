import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDeveloper } from 'src/app/core';
import { DeveloperService } from 'src/app/core/services/developer.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
    selector: 'app-developer',
    templateUrl: './developer.component.html',
    styleUrls: ['./developer.component.scss'],
    animations: [],
})
export class DeveloperComponent {
    data?: IDeveloper;
    id: string;
    constructor(
        private developerService: DeveloperService,
        private route: ActivatedRoute,
        private loadingService: LoadingService
    ) {
        this.id = this.route.snapshot.params.id;
        this.loadingService.isLoading$.next(true);
        this.developerService.getDeveloper(this.id).subscribe((dev) => {
            this.data = dev;
            console.log(this.data);
            this.loadingService.isLoading$.next(false);
        });
    }
}
