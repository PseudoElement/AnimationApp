import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAboutPageResponse } from '../model';
import { endpoints } from '../api/endpoints';

@Injectable({
    providedIn: 'root',
})
export class AboutService {
    constructor(private http: HttpClient) {}

    public getAbout(): Observable<IAboutPageResponse> {
        return this.http.get<IAboutPageResponse>(endpoints.getAbout as string);
    }
}
