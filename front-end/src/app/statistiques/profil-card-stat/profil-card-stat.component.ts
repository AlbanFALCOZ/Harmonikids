import { Component, Input } from '@angular/core';
import { Game } from 'src/models/game.model';
import { Membre } from 'src/models/membre.model';

@Component({
  selector: 'app-profil-card-stat',
  templateUrl: './profil-card-stat.component.html',
  styleUrl: './profil-card-stat.component.scss'
})
export class ProfilCardStatComponent {

  memberName = 'Alice ROUTINE';
  memberAge = 8;
  numberOfStars = 1000;  

  @Input() membre!: Membre;

  @Input() score?: number | undefined;

  constructor() { }

  ngOnInit(): void {
    if (this.score) {
    }
  }

  ngOnChanges(): void {
    if (this.score) {
    }
  }

  // constructor(private membreService: MembreService) {
  //   this.selectedMemberId = this.membreService.getMemberId(); }

}
