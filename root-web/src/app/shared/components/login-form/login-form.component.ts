import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { Cookies, IUser, alerts, getNameByEmail, omitObjectProp } from 'src/app/core';
import { status } from 'src/app/core/api';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { AppState } from 'src/app/core/store/store';
import { UserActions } from 'src/app/core/store/user';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
    constructor(
        public formBuilder: FormBuilder,
        private authService: AuthService,
        private store: Store<AppState>,
        private modalService: ModalService,
        private alertService: AlertService
    ) {}
    loginForm = this.formBuilder.nonNullable.group({
        email: [''],
        password: [''],
    });

    public async onSubmit() {
        if (this.loginForm.invalid) return;
        if (this.alertService.isOpen$.value) return;
        const email = this.loginForm.value.email as string;
        const password = this.loginForm.value.password as string;
        const response = await firstValueFrom(this.authService.loginUser({ email, password }));
        if (response.status === status.notFound) {
            this.alertService.message$.next(alerts.userDoesntExist);
            this.alertService.isOpen$.next(true);
        } else if (response.status === status.unauthorized) {
            this.alertService.message$.next(alerts.incorrectPassword);
            this.alertService.isOpen$.next(true);
        } else {
            const user = response.body as IUser;
            const userWithName = { ...user, name: getNameByEmail(user.email) };
            this.store.dispatch(UserActions.setUser(userWithName));
            Cookies.setCookie('token', JSON.stringify(user.access_token));
            Cookies.setCookie('id', JSON.stringify(user.id));
            this.alertService.message$.next(alerts.successLogin);
            this.alertService.isOpen$.next(true);
            this.modalService.toggleVisibility('auth');
            this.loginForm.reset();
        }
    }
}
