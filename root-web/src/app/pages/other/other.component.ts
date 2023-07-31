import { strokeLineWidthRadioInputs } from './../../core/constants/other-page';
import { takeUntil, Subject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IRadioInput, IRandomWheelSegment, IWinResult, SidesX, segments } from 'src/app/core';
import { OtherPageService } from 'src/app/core/services/other-page.service';
import { RandomWheelActions, selectResults } from 'src/app/core/store/random-wheel';
import { AppState } from 'src/app/core/store/store';
import { opacityAnimation } from 'src/app/shared/animations';
import { fadeInLeftAnimation, fadeInRightAnimation } from 'angular-animations';

@Component({
    selector: 'app-other',
    templateUrl: './other.component.html',
    styleUrls: ['./other.component.scss'],
    animations: [opacityAnimation(), fadeInLeftAnimation(), fadeInRightAnimation()],
})
export class OtherComponent implements OnDestroy {
    private readonly TABLE_ROWS_PER_PAGE = 5;
    public readonly strokeLineWidthRadioInputs: IRadioInput[] = strokeLineWidthRadioInputs;
    public readonly segments: IRandomWheelSegment[] = segments;
    wheelResults: IWinResult[] = [];
    resultsWithFormattedDate: Array<string[]> = [];
    isDestroyed$: Subject<boolean> = new Subject();
    tableHeaders: string[] = ['User', 'Win', 'Time'];
    activeSlide: SidesX = 'left';
    tableDataPage1: Array<string[]> = [];
    tableDataPage2: Array<string[]> = [];
    tableDataPage3: Array<string[]> = [];
    tableDataPage4: Array<string[]> = [];
    constructor(private otherPageService: OtherPageService, private store: Store<AppState>) {
        this.otherPageService.openSocket();
        this.store.dispatch(RandomWheelActions.loadAllResultsFromDB());
        this.store.pipe(select(selectResults), takeUntil(this.isDestroyed$)).subscribe((results) => {
            this.resultsWithFormattedDate = this.getResultsWithFormattedDate(results);
            this._updateAllTablePagesData();
        });
    }

    ngAfterViewInit() {}
    ngOnDestroy(): void {
        this.otherPageService.closeSocket();
        this.isDestroyed$.next(true);
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

    public setActiveSlideInTwoSlidesSlider(side: SidesX) {
        this.activeSlide = side;
    }

    private _updateAllTablePagesData() {
        this.tableDataPage1 = this.getRowsArrayPerSlide(0);
        this.tableDataPage2 = this.getRowsArrayPerSlide(1);
        this.tableDataPage3 = this.getRowsArrayPerSlide(2);
        this.tableDataPage4 = this.getRowsArrayPerSlide(3);
    }
}
