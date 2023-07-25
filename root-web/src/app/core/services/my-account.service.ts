import { Observable, Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { IUpdateUserEmailRequest, IUpdateUserPhotoRequest, IUpdateUserPhotoRes, IUser, IUserWithName } from '../model';
import { endpoints } from '../api';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/store';
import { UserActions, selectUser } from '../store/user';
import { getNameByEmail } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class MyAccountService implements OnDestroy {
    user!: IUserWithName | null;
    isDestroyed$: Subject<boolean> = new Subject();
    constructor(private http: HttpClient, private store: Store<AppState>) {
        this.store.pipe(takeUntil(this.isDestroyed$), select(selectUser)).subscribe((user) => (this.user = user));
    }

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
            });
    }

    public updateUserEmail(body: IUpdateUserEmailRequest): void {
        this.http.patch<IUser>(endpoints.updateUserEmail as string, body).subscribe((user) => {
            const userWithName = { ...user, name: getNameByEmail(user.email) } as IUserWithName;
            this.store.dispatch(UserActions.setUser(userWithName));
        });
    }
}
