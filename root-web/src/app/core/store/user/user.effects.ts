import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from '.';
import { mergeMap, catchError, map, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { omitObjectProp } from '../../utils';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private authService: AuthService) {}
    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUser),
            mergeMap((action) => this.authService.getUser(action.id)),
            map((user) => UserActions.setUser(omitObjectProp('password', user))),
            catchError((err) => {
                console.log('ERROR: ', err);
                return of(err);
            })
        )
    );
}
