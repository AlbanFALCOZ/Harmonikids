import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, of } from 'rxjs';
import { Membre } from 'src/models/membre.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class MembreService {
   
    public membres:Membre[] = [];
    private memberId!: number ;
    private membre!: Membre; 
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

  setMemberId(id: number): void {
    this.memberId = id;
  }

  getMemberId(): number {
    return this.memberId;
  }

  addMembre(newMember: Membre) {
    this.http.post<Membre>(this.membreUrl, newMember, this.httpOptions).subscribe(() => this.retrieveMembres());
  }

  deleteMember(membre: Membre): void {
    const urlWithId = this.membreUrl + '/' + membre.id;
    this.http.delete<Membre>(urlWithId, this.httpOptions).subscribe(() => this.retrieveMembres());
  }


  getWelcomeMessage(memberId: number | undefined): string {
    console.log("get welcome message:", memberId);
  
    if (memberId !== undefined) {
      const membre = this.getMemberByIdSync(memberId);
      console.log(this.membre)
      if (this.membre !== null) {
        console.log("The first name:", this.membre.firstName);
        return `Bonjour ${this.membre.firstName} !`;
      } else {
        return "Heureux de te revoir.";
      }
    } else {
      return "Heureux de te revoir.";
    }
  }
  
  
  getMemberByIdSync(id: number | undefined): Membre | null {
    const urlWithId = `${this.membreUrl}/${id}`;
    console.log("urlWithId  " + urlWithId);
    console.log(this.membreUrl);
    console.log(id);
  
    let membre: Membre | null = null;
  
    this.http.get<Membre>(urlWithId).subscribe(
      (data: Membre) => {
       
        membre = data;
        this.setMembre(membre)
      },
      (error) => {
        console.error('Error fetching member:', error);
      }
    );
  
    return membre;
  }

  setMembre(membre: Membre | null): void {
    if (membre !== null) {
      console.log("Membre is setMembre" + membre)
        this.membre = membre; 
    } 
}




   
}


