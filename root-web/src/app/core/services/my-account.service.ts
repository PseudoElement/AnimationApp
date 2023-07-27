import { Observable, Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
    IUpdateUserEmailRequest,
    IUpdateUserPasswordRequest,
    IUpdateUserPhotoRequest,
    IUpdateUserPhotoRes,
    IUser,
    IUserWithName,
} from '../model';
import { endpoints } from '../api';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/store';
import { UserActions, selectUser } from '../store/user';
import { getNameByEmail } from '../utils';
import { AlertService } from './alert.service';
import { alerts } from '../constants';

@Injectable({
    providedIn: 'root',
})
export class MyAccountService implements OnDestroy {
    isDestroyed$: Subject<boolean> = new Subject();
    constructor(private http: HttpClient, private store: Store<AppState>, private alertService: AlertService) {}

    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
    }

    public updateUserPhoto({ id, newPhoto }: IUpdateUserPhotoRequest): void {
        const formData = new FormData();
        formData.append('newPhoto', newPhoto, newPhoto.name);
        formData.append('id', id);
        this.http
            .patch<IUpdateUserPhotoRes>(endpoints.updateUserPhoto as string, formData)
            .subscribe(({ photoSrc }) => {
                this.store.dispatch(UserActions.setUserPhotoSrc({ photoSrc }));
                this._triggerAlert(alerts.successUpdatePhoto);
            });
    }

    public updateUserEmail(body: IUpdateUserEmailRequest): void {
        this.http.patch<IUser>(endpoints.updateUserEmail as string, body).subscribe((user) => {
            const userWithName = { ...user, name: getNameByEmail(user.email) } as IUserWithName;
            this.store.dispatch(UserActions.setUser(userWithName));
            this._triggerAlert(alerts.successUpdateEmail);
        });
    }

    public updateUserPassword(body: IUpdateUserPasswordRequest): void {
        this.http.patch<IUser>(endpoints.updateUserPassword as string, body).subscribe(() => {
            this._triggerAlert(alerts.successUpdatePassword);
        });
    }

    private _triggerAlert(message: string) {
        this.alertService.isOpen$.next(true);
        this.alertService.message$.next(message);
    }
}
