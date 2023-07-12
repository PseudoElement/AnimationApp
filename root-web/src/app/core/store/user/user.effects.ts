import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from '.';
import { mergeMap, catchError, map, tap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { getNameByEmail } from '../../utils';
import { Router } from '@angular/router';
import { CookiesService } from '../../services/cookies.service';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private cookiesService: CookiesService
    ) {}

    private _getAccessToken() {
        return this.cookiesService.getAccessToken() ?? '';
    }

    private _getRefreshToken() {
        return this.cookiesService.getRefreshToken() ?? '';
    }

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUser),
            mergeMap((action) => this.authService.getUser(action.id)),
            map((user) => ({
                ...user.user,
                access_token: this._getAccessToken(),
                refresh_token: this._getRefreshToken(),
                name: getNameByEmail(user.user.email),
            })),
            map((user) => UserActions.setUser(user)),
            catchError((err) => throwError(() => err))
        )
    );

    logoutUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.logoutUser),
            tap(() => this.router.url === '/chat' && this.router.navigateByUrl('/')),
            map(() => UserActions.unsetUser())
        )
    );
}
