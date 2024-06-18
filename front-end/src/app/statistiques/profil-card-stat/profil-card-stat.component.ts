import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-card-stat',
  templateUrl: './profil-card-stat.component.html',
  styleUrl: './profil-card-stat.component.scss'
})
export class ProfilCardStatComponent {

  memberName = 'Alice ROUTINE';
  memberAge = 8;
  numberOfStars = 1000;  


  // membres: Membre[] = [];  
  // membre: Membre | undefined;
  // selectedMemberId: number | undefined = 0;

  // constructor(private membreService: MembreService) {
  //   this.selectedMemberId = this.membreService.getMemberId(); 

  //   this.membreService.membres$.subscribe((membres: Membre[]) => {
  //     this.membres = membres;
  //     this.membre = this.membres.find(membre => membre.id === this.selectedMemberId);
  //     console.log("Membre", this.membre);
      
  //   });

}
