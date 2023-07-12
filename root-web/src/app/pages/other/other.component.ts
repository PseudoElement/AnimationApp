import { Observable, takeUntil, Subject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IWinResult, segments } from 'src/app/core';
import { OtherPageService } from 'src/app/core/services/other-page.service';
import { RandomWheelActions, selectResults } from 'src/app/core/store/random-wheel';
import { AppState } from 'src/app/core/store/store';

@Component({
    selector: 'app-other',
    templateUrl: './other.component.html',
    styleUrls: ['./other.component.scss'],
})
export class OtherComponent implements OnDestroy {
    segments = segments;
    wheelResults: IWinResult[] = [];
    isDestroyed$: Subject<boolean> = new Subject();
    constructor(private otherPageService: OtherPageService, private store: Store<AppState>) {
        this.otherPageService.openSocket();
        this.store.dispatch(RandomWheelActions.loadAllResultsFromDB());
        this.store
            .pipe(select(selectResults), takeUntil(this.isDestroyed$))
            .subscribe((results) => (this.wheelResults = results));
    }

    public onWheelStop(newResult: IWinResult) {
        this.otherPageService.sendNewResult(newResult);
    }

    public getResultsAsArrays(): Array<any[]> {
        // if (!this.wheelResults.length) return [];

        return this.wheelResults.map((item) => {
            const date = `${new Date(item.createdAt).toLocaleTimeString()}, ${new Date(
                item.createdAt
            ).toLocaleDateString()}`;
            return [item.username, item.value, date];
        });
    }

    ngOnDestroy(): void {
        this.otherPageService.closeSocket();
        this.isDestroyed$.next(true);
    }
}
