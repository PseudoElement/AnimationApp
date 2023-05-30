import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    message$: Subject<string> = new Subject();
    isOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
