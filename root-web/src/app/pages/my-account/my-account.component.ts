import { Component } from '@angular/core';
import { CookiesService } from 'src/app/core/services/cookies.service';
import { MyAccountService } from 'src/app/core/services/my-account.service';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent {
    constructor(private myAccountService: MyAccountService, private cookieService: CookiesService) {}

    public async onChange(e: any) {
        const file = e.target.files[0] as File;
        const formData = new FormData() as any;
        formData.append('newPhoto', file, file.name);
        const id = Number(this.cookieService.getUserID());
        formData.append('id', id);
        try {
            const response = await fetch('http://localhost:3000/account/photo', {
                method: 'POST',
                body: formData,
            });
            const json = await response.json();
            console.log('JSON', json);
        } catch (error) {
            console.error('ERR', error);
        }
        // this.myAccountService.updateUserPhoto({ id: id, newPhoto: file }).subscribe((v) => console.log('res', v));
    }
}
