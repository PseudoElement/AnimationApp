import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { Cookies, omitObjectProp } from 'src/app/core';
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
        const users = await firstValueFrom(this.authService.getAllUsers());
        const foundUser = users.find((user) => user.email === email);
        if (!foundUser) {
            this.alertService.message$.next("User doesn't exist");
            this.alertService.isOpen$.next(true);
        } else if (foundUser && foundUser.password !== password) {
            this.alertService.message$.next('Incorrect password');
            this.alertService.isOpen$.next(true);
        } else {
            const userWithoutPass = omitObjectProp('password', foundUser);
            this.store.dispatch(UserActions.setUser(userWithoutPass));
            Cookies.setCookie('token', JSON.stringify(userWithoutPass.token));
            Cookies.setCookie('id', JSON.stringify(userWithoutPass.id));
            this.alertService.message$.next('Successfull authorization :)');
            this.alertService.isOpen$.next(true);
            this.modalService.toggleVisibility('auth');
            this.loginForm.reset();
        }
    }
}
