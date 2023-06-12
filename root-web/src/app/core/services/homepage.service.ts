import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../api/endpoints';
import { IHomePageData } from '../model';

@Injectable({
    providedIn: 'root',
})
export class HomepageService {
    constructor(private http: HttpClient) {}
    public getHomePageData(): Observable<IHomePageData> {
        return this.http.get<IHomePageData>(endpoints.getHomepage as string);
    }
}
