import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAboutPageResponse, IInfoCard } from '../model';
import { endpoints } from '../api/endpoints';

@Injectable({
    providedIn: 'root',
})
export class AboutService {
    constructor(private http: HttpClient) {}

    public getAbout(): Observable<IInfoCard[]> {
        return this.http.get<IInfoCard[]>(endpoints.getAbout as string);
    }
}
