import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, exhaustMap, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnDestroy {
    isOpen$: BehaviorSubject<boolean>;
    isDestroy$: Subject<boolean> = new Subject();
    message$: Subject<string>;
    constructor(private alertService: AlertService) {
        this.message$ = this.alertService.message$;
        this.isOpen$ = this.alertService.isOpen$;
        this.message$
            .pipe(
                exhaustMap((message) => message),
                takeUntil(this.isDestroy$)
            )
            .subscribe(() => {
                setTimeout(() => this.isOpen$.next(false), 3000);
            });
    }

    ngOnDestroy(): void {
        this.isDestroy$.next(true);
    }

    public onClose() {
        this.isOpen$.next(false);
    }
}
