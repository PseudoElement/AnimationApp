import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { Cookies, UserOnServer, omitObjectProp } from 'src/app/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/core/store/store';
import { setUser } from 'src/app/core/store/user';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
    constructor(public formBuilder: FormBuilder, private authService: AuthService, private store: Store<AppState>) {}
    loginForm = this.formBuilder.nonNullable.group({
        email: [''],
        password: [''],
    });

    public async onSubmit() {
        if (this.loginForm.invalid) return;
        const email = this.loginForm.value.email as string;
        const password = this.loginForm.value.password as string;
        const users = await firstValueFrom(this.authService.getAllUsers());
        const foundUser = users.find((user) => user.email === email);
        if (!foundUser) this.authService.message = "User doesn't exist";
        else if (foundUser && foundUser.password !== password) this.authService.message = 'Incorrect password';
        else {
            const userWithoutPass = omitObjectProp('password', foundUser);
            this.store.dispatch(setUser(userWithoutPass));
            Cookies.setCookie('user', userWithoutPass);
            this.authService.message = 'Successfull authorization :)';
        }
    }
}
