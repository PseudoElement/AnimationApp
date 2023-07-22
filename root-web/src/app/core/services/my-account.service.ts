import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUpdateUserPhotoRequest } from '../model';
import { endpoints } from '../api';

@Injectable({
    providedIn: 'root',
})
export class MyAccountService {
    constructor(private http: HttpClient) {}

    public uploadUserPhoto({ id, newPhoto }: IUpdateUserPhotoRequest): Observable<any> {
        const formData = new FormData();
        formData.append('newPhoto', newPhoto, newPhoto.name);
        formData.append('id', id);
        return this.http.post<any>(endpoints.updateUserPhoto as string, formData);
    }
}
