import { Injectable } from '@angular/core';
import { Observable, combineLatest, map, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ScreenSizeService {
    private width$: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);
    private height$: BehaviorSubject<number> = new BehaviorSubject(window.innerHeight);
    constructor() {
        window.addEventListener('resize', () => this._changeScreenSize());
    }

    ngOnDestroy() {
        window.removeEventListener('resize', () => this._changeScreenSize());
    }
    public getSizes(): Observable<{ width: number; height: number }> {
        return combineLatest([this.width$, this.height$]).pipe(map((arr) => ({ width: arr[0], height: arr[1] })));
    }
    private _changeScreenSize() {
        this.height$.next(window.innerHeight);
        this.width$.next(window.innerWidth);
    }
}
