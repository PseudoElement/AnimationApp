import { takeUntil, Subject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IWinResult, segments } from 'src/app/core';
import { OtherPageService } from 'src/app/core/services/other-page.service';
import { RandomWheelActions, selectResults } from 'src/app/core/store/random-wheel';
import { AppState } from 'src/app/core/store/store';
import { opacityAnimation } from 'src/app/shared/animations';
import {
    fadeInLeftAnimation,
    fadeInLeftOnEnterAnimation,
    fadeInRightAnimation,
    fadeInRightOnEnterAnimation,
} from 'angular-animations';

@Component({
    selector: 'app-other',
    templateUrl: './other.component.html',
    styleUrls: ['./other.component.scss'],
    animations: [opacityAnimation(), fadeInLeftAnimation(), fadeInRightAnimation()],
})
export class OtherComponent implements OnDestroy {
    private readonly TABLE_ROWS_PER_PAGE = 5;
    segments = segments;
    wheelResults: IWinResult[] = [];
    resultsWithFormattedDate: Array<string[]> = [];
    isDestroyed$: Subject<boolean> = new Subject();
    tableHeaders: string[] = ['User', 'Win', 'Time'];
    constructor(private otherPageService: OtherPageService, private store: Store<AppState>) {
        this.otherPageService.openSocket();
        this.store.dispatch(RandomWheelActions.loadAllResultsFromDB());
        this.store.pipe(select(selectResults), takeUntil(this.isDestroyed$)).subscribe((results) => {
            this.resultsWithFormattedDate = this.getResultsWithFormattedDate(results);
        });
    }

    ngAfterViewInit() {}

    public getArrayToCreateSlidesInNgFor(): number[] {
        const slidesCount = Math.ceil(this.resultsWithFormattedDate.length / this.TABLE_ROWS_PER_PAGE);
        return Array.from(Array(slidesCount).keys());
    }

    public getRowsArrayPerSlide(slideIndex: number): Array<string[]> {
        return this.resultsWithFormattedDate.slice(
            slideIndex * this.TABLE_ROWS_PER_PAGE,
            slideIndex * this.TABLE_ROWS_PER_PAGE + this.TABLE_ROWS_PER_PAGE
        );
    }

    public onWheelStop(newResult: IWinResult) {
        this.otherPageService.sendNewResult(newResult);
    }

    public getResultsWithFormattedDate(results: IWinResult[]): Array<string[]> {
        return results.map((item) => {
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
