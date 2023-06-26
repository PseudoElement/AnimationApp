import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from '.';
import { mergeMap, catchError, map, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Cookies, getNameByEmail } from '../../utils';
import { AlertService } from '../../services/alert.service';
import { alerts } from '../../constants';
import { IUserWithName } from '../../model';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private authService: AuthService, private alertService: AlertService) {}

    private _getToken() {
        return Cookies.getCookie('token') ?? '';
    }

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUser),
            mergeMap((action) => this.authService.getUser(action.id)),
            map((user) => ({ ...user, name: getNameByEmail(user.email), access_token: this._getToken() })),
            tap(console.log),
            map((user: IUserWithName) => UserActions.setUser(user)),
            catchError((err) => {
                this.alertService.isOpen$.next(true);
                this.alertService.message$.next(alerts.requestError);
                return of(err);
            })
        )
    );
}
