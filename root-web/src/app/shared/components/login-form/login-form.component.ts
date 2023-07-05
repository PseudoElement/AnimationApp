import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { Cookies, IUser, alerts, getNameByEmail } from 'src/app/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CookiesService } from 'src/app/core/services/cookies.service';
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
        private alertService: AlertService,
        private cookiesService: CookiesService
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
        try {
            const response = await firstValueFrom(this.authService.loginUser({ email, password }));
            const user = response.body as IUser;
            const userWithName = { ...user, name: getNameByEmail(user.email) };
            this.store.dispatch(UserActions.setUser(userWithName));
            this.cookiesService.onUserAuth({
                access_token: user.access_token,
                id: user.id,
                refresh_token: user.refresh_token,
            });
            this.alertService.message$.next(alerts.successLogin);
            this.alertService.isOpen$.next(true);
            this.modalService.toggleVisibility('auth');
            this.loginForm.reset();
        } catch (err) {}
    }
}
