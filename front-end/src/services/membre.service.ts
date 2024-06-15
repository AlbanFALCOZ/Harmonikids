import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Membre } from 'src/models/membre.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class MembreService {
   
    public membres:Membre[] = [];
    private memberId: number | undefined ;
    private membreUrl = serverUrl + '/user';
    private apiUrl = '../../../backend/app/api/user';

    private httpOptions = httpOptionsBase;

    registerUser(userData: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, userData);
    }
    
   

    public membres$ = new BehaviorSubject(this.membres);

    constructor(private http: HttpClient) {
      this.retrieveMembres();
    }

    retrieveMembres(): void {
      this.http.get<Membre[]>(this.membreUrl).subscribe((membreList) => {
        this.membres = membreList;
        this.membres$.next(this.membres);
      });
    }

    

    getWelcomeMessage(memberId: number |undefined ): string {
        const membre = this.membres.find(m => m.id === memberId);
        if (membre) {
          return `Bonjour ${membre.firstName}!`;
        } else {
          return "Heureux de te revoir.";
        }
      }


  setMemberId(id: number | undefined): void {
    this.memberId = id;
  }

  getMemberId(): number | undefined {
    return this.memberId;
  }

  addMembre(newMember: Membre) {
    this.http.post<Membre>(this.membreUrl, newMember, this.httpOptions).subscribe(() => this.retrieveMembres());
  }

  deleteMember(membre: Membre): void {
    const urlWithId = this.membreUrl + '/' + membre.id;
    this.http.delete<Membre>(urlWithId, this.httpOptions).subscribe(() => this.retrieveMembres());
  }







   
}


