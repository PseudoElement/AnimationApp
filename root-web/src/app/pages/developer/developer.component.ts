import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDeveloper } from 'src/app/core';
import { DeveloperService } from 'src/app/core/services/developer.service';

@Component({
    selector: 'app-developer',
    templateUrl: './developer.component.html',
    styleUrls: ['./developer.component.scss'],
})
export class DeveloperComponent {
    data?: IDeveloper;
    id: string;
    constructor(private developerService: DeveloperService, private route: ActivatedRoute) {
        this.id = this.route.snapshot.params.id;
        this.developerService.getDeveloper(this.id).subscribe((dev) => (this.data = dev));
    }
}
