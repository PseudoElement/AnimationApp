import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUpdateUserPhotoRequest } from '../model';
import { endpoints } from '../api';

@Injectable({
    providedIn: 'root',
})
export class MyAccountService {
    private readonly patchRequestOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    constructor(private http: HttpClient) {}

    public updateUserPhoto(body: IUpdateUserPhotoRequest): Observable<any> {
        return this.http.patch<any>(endpoints.updateUserPhoto as string, body, this.patchRequestOptions);
    }
}
