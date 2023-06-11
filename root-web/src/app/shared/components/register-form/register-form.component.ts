import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Cookies, UserOnClient, alerts, confirmPasswords, getNameByEmail, omitObjectProp } from 'src/app/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/store';
import { selectUser, UserActions } from 'src/app/core/store/user';
import { AlertService } from 'src/app/core/services/alert.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
    user$: Observable<UserOnClient | null>;
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
                    Validators.minLength(9),
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
        const users = await firstValueFrom(this.authService.getAllUsers());
        let isExistUser: boolean = !!users.find((user) => user.email === email);
        if (!isExistUser) {
            const newUser = {
                email: email,
                password: password,
                id: crypto.randomUUID(),
                token: 'Access token',
                name: getNameByEmail(email),
            };
            const userWithoutPass = omitObjectProp('password', newUser);
            this.authService.registerUser(newUser).subscribe();
            Cookies.setCookie('token', JSON.stringify(userWithoutPass.token));
            Cookies.setCookie('id', JSON.stringify(userWithoutPass.id));
            this.store.dispatch(UserActions.setUser(userWithoutPass));
            this.registerForm.reset();
            this.modalService.toggleVisibility('auth');
            this.alertService.isOpen$.next(true);
            this.alertService.message$.next(alerts.successRegister);
        } else {
            this.alertService.isOpen$.next(true);
            this.alertService.message$.next(alerts.userExists);
        }
    }
}
