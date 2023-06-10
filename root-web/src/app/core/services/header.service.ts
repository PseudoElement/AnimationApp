import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HeaderService {
    isVisible$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    isScrolled$: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
