import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UserOnServer, confirmPasswords, getNameByEmail } from 'src/app/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
    constructor(public formBuilder: FormBuilder, private authService: AuthService) {}
    registerForm = this.formBuilder.nonNullable.group(
        {
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(20),
                    Validators.pattern('^[a-zA-Z]+$'),
                ],
            ],
            confirmPassword: [''],
        },
        { validators: confirmPasswords('password', 'confirmPassword') }
    );

    public onSubmit() {
        if (this.registerForm.valid) {
            const user = this.registerForm.value;
            console.log(user);
            this.authService
                .registerUser({
                    ...user,
                    id: crypto.randomUUID(),
                    token: 'Access token',
                    name: getNameByEmail(user.email as string),
                } as UserOnServer)
                .subscribe((res) => console.log('RESP', res));
        }
    }
}
