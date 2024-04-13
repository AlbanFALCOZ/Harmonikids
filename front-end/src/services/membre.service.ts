import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Membre_LIST } from 'src/mocks/membre-list.mock';
import { Membre } from 'src/models/membre.model';

@Injectable({
    providedIn: 'root'
})
export class MembreService {
   
    private membres:Membre[] = Membre_LIST;
    private memberId: string | undefined ;


    public membres$: BehaviorSubject<Membre[]>
    = new BehaviorSubject(this.membres);

    constructor() { }

    getWelcomeMessage(memberId: string |undefined ): string {
       
        const membre = this.membres.find(m => m.id === memberId);
        if (membre) {
          return `Bonjour ${membre.firstName}!`;
        } else {
          return "Heureux de te revoir.";
        }
      }



  setMemberId(id: string): void {
    this.memberId = id;
  }

  getMemberId(): string | undefined {
    return this.memberId;
  }

  addMembre(newMember: Membre) {
    this.membres.push(newMember);
    this.membres$.next(this.membres);
  }
   
}


