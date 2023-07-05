import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../api/endpoints';
import { IApplicationCard, IGameCard } from '../model';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient) {}

    public getAllWebApplications(): Observable<IApplicationCard[]> {
        return this.http.get<IApplicationCard[]>(endpoints.getWebApplications as string);
    }
    public getPortionOfApps(pageIndex: number, limit: number): Observable<IApplicationCard[]> {
        return this.http.get<IApplicationCard[]>(endpoints.getWebApplications as string, {
            params: {
                _page: pageIndex,
                _limit: limit,
            },
        });
    }
    public getPortionOfGames(pageIndex: number, limit: number): Observable<IGameCard[]> {
        return this.http.get<IGameCard[]>(endpoints.getGames as string, {
            params: {
                _page: pageIndex,
                _limit: limit,
            },
        });
    }
    public getAllGames(): Observable<IGameCard[]> {
        return this.http.get<IGameCard[]>(endpoints.getGames as string);
    }
}
