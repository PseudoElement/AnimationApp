import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from '.';
import { mergeMap, catchError, map, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { omitObjectProp } from '../../utils';
import { AlertService } from '../../services/alert.service';
import { alerts } from '../../constants';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private authService: AuthService, private alertService: AlertService) {}
    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUser),
            mergeMap((action) => this.authService.getUser(action.id)),
            catchError((err) => {
                this.alertService.isOpen$.next(true);
                this.alertService.message$.next(alerts.requestError);
                return of(err);
            })
        )
    );
}
