import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
    constructor(public formBuilder: FormBuilder) {}
    loginForm = this.formBuilder.nonNullable.group({
        email: [''],
        password: [''],
    });

    public onSubmit() {
        if (this.loginForm.valid) {
            console.log(this.loginForm);
        }
    }
}
