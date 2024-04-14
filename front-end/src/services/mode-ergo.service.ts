import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModeService {
    private isDisabledSource = new BehaviorSubject<boolean>(false);
    isDisabled$ = this.isDisabledSource.asObservable();

    toggleMode() {
        this.isDisabledSource.next(!this.isDisabledSource.value);
    }
}