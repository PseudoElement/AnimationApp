import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFormBuilderData, formData } from 'src/app/core';
import { CookiesService } from 'src/app/core/services/cookies.service';
import { MyAccountService } from 'src/app/core/services/my-account.service';
import { AppState } from 'src/app/core/store/store';
import { selectUserPhoto } from 'src/app/core/store/user';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
    public readonly formData: IFormBuilderData[] = formData;
    userPhoto$: Observable<string | undefined | null>;
    uploadPhotoInput!: HTMLInputElement;
    @ViewChild('uploadRef', { read: ElementRef, static: true }) uploadRef!: ElementRef;
    constructor(
        private myAccountService: MyAccountService,
        private cookieService: CookiesService,
        private store: Store<AppState>,
        private router: Router
    ) {
        this.userPhoto$ = this.store.select(selectUserPhoto);
    }

    ngOnInit(): void {
        const access_token = this.cookieService.getAccessToken();
        if (!access_token) this.router.navigateByUrl('/');
        this.uploadPhotoInput = this.uploadRef.nativeElement;
    }

    public onAddingNewUserPhoto(e: Event) {
        const input = e.target as any;
        const file = input.files[0];
        const isConfirmed = window.confirm('Your photo will be updated. Continue?');
        if (!isConfirmed) {
            input.value = '';
        } else {
            const id = this.cookieService.getUserID() ?? '';
            this.myAccountService.updateUserPhoto({ id: id, newPhoto: file });
        }
    }

    public onEmailChange(form: FormGroup): void {
        const id = this.cookieService.getUserID() ?? '';
        const email = form.controls.email.value;
        this.myAccountService.updateUserEmail({ id: id, email });
    }

    public onPasswordChange(isValid: boolean) {}
}
