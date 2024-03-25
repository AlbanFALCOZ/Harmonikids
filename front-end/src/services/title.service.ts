import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TitleService {
    title: string = 'Bienvenue';
    search: string = 'Recherche...';

    constructor() { }

    getTitle(): string {
        return this.title;
    }

    getSearch(): string {
        return this.search;
    }
}
