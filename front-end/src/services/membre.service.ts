import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Membre_LIST } from 'src/mocks/membre-list.mock';
import { Membre } from 'src/models/membre.model';

@Injectable({
    providedIn: 'root'
})
export class MembreService {
   
    private membres:Membre[] = Membre_LIST;


    public membres$: BehaviorSubject<Membre[]>
    = new BehaviorSubject(this.membres);

    constructor() { }

   
}


