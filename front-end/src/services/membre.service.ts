import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, of, tap } from 'rxjs';
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
    private imageMember:string | undefined ;
    private membreUrl = serverUrl + '/user';
    private apiUrl = serverUrl + '/user';

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
    console.log("In add membre");
    this.http.post<Membre>(this.membreUrl, newMember, this.httpOptions).subscribe(() => this.retrieveMembres());
  }

  deleteMember(membre: Membre): void {
    const urlWithId = this.membreUrl + '/' + membre.id;
    this.http.delete<Membre>(urlWithId, this.httpOptions).subscribe(() => this.retrieveMembres());
  }


  getWelcomeMessage(memberId: number | undefined): string {
    if (memberId === undefined) {
      return 'Heureux de te revoir!';
    }

    const member = this.membres.find(m => m.id === memberId);

    if (member) {
      return `Bonjour, ${member.firstName}!`;
    } else {
      return 'Member not found.';
    }
  }

  getMembre():Membre{
    return this.membre;
  }

  getImageById(memberId: number | undefined): string {
    const member = this.membres.find(m => m.id === memberId);
    if (member) {
      return member.image;
    } else {
      return 'je n\'arrive pas '; 
    }
  }

  getImage():string |undefined {
    return this.imageMember;
  }

  setImage(image : string){
    this.imageMember = image;
  }
  
  
  setMembre(membre: Membre | null): void {
    if (membre !== null) {
      console.log("Membre is setMembre" + membre)
        this.membre = membre; 
    } 
}




   
}


