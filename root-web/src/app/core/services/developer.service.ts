import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeveloper } from '../model';
import { endpoints } from '../api/endpoints';

@Injectable({
    providedIn: 'root',
})
export class DeveloperService {
    constructor(private http: HttpClient) {}

    public getDeveloper(id: string): Observable<IDeveloper> {
        return this.http.get<IDeveloper>((endpoints.getDeveloper as (id: string) => string)(id));
    }
}
