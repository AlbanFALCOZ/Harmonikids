import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    private isNavbarVisible = new BehaviorSubject<boolean>(false);
    isNavbarVisible$ = this.isNavbarVisible.asObservable();

    toggleNavbarVisibility() {
        this.isNavbarVisible.next(!this.isNavbarVisible.value);
    }
}
