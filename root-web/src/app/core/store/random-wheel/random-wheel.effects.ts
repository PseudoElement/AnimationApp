import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RandomWheelActions } from '.';
import { OtherPageService } from '../../services/other-page.service';

@Injectable()
export class RandomWheelEffects {
    constructor(private actions$: Actions, private otherPageSrvice: OtherPageService) {}

    loadAllResults$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RandomWheelActions.loadAllResultsFromDB),
            switchMap(() => this.otherPageSrvice.getAllResults()),
            map((results) => RandomWheelActions.setResultsArray({ results })),
            catchError((err) => throwError(() => err))
        )
    );
}
