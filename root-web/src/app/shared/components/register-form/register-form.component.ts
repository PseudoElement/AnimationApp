import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Cookies, IUser, alerts, confirmPasswords, getNameByEmail, omitObjectProp } from 'src/app/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/store';
import { selectUser, UserActions } from 'src/app/core/store/user';
import { AlertService } from 'src/app/core/services/alert.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { status } from 'src/app/core/api';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
    user$: Observable<IUser | null>;
    constructor(
        public formBuilder: FormBuilder,
        private authService: AuthService,
        private store: Store<AppState>,
        private alertService: AlertService,
        private modalService: ModalService
    ) {
        this.user$ = this.store.select(selectUser);
        this.user$.subscribe((val) => console.log('USER Object', val));
    }
    registerForm = this.formBuilder.nonNullable.group(
        {
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(20),
                    Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
                ],
            ],
            confirmPassword: [''],
        },
        { validators: confirmPasswords('password', 'confirmPassword') }
    );

    public async onSubmit() {
        if (this.registerForm.invalid) return;
        if (this.alertService.isOpen$.value) return;
        const email = this.registerForm.value.email as string;
        const password = this.registerForm.value.password as string;
        const response = await firstValueFrom(this.authService.registerUser({ email, password }));
        if (response.status === status.conflict) {
            this.alertService.isOpen$.next(true);
            this.alertService.message$.next(alerts.userExists);
        } else {
            const user = response.body as IUser;
            const userWithName = { ...user, name: getNameByEmail(user.email) };
            this.store.dispatch(UserActions.setUser(userWithName));
            Cookies.setCookie('token', JSON.stringify(user.access_token));
            Cookies.setCookie('id', JSON.stringify(user.id));
            this.registerForm.reset();
            this.modalService.toggleVisibility('auth');
            this.alertService.isOpen$.next(true);
            this.alertService.message$.next(alerts.successRegister);
        }
    }
}
