import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModeService {
    private disabledSource = new BehaviorSubject<boolean>(false);
    isDisabled$ = this.disabledSource.asObservable();

    toggleMode() {
        const currentValue = this.disabledSource.value;
        this.disabledSource.next(!currentValue);
    }
}