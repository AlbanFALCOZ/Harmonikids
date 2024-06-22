import { Component, Input } from '@angular/core';
import { Game } from 'src/models/game.model';
import { Membre } from 'src/models/membre.model';

@Component({
  selector: 'app-profil-card-stat',
  templateUrl: './profil-card-stat.component.html',
  styleUrl: './profil-card-stat.component.scss'
})
export class ProfilCardStatComponent { 

  @Input() membre!: Membre;

  @Input() score?: number | undefined;

  constructor() { }

  ngOnInit(): void {
    if (this.score === undefined || this.score === null || isNaN(this.score) || this.score < 0) {
      this.score = 0;
    }
  }

  ngOnChanges(): void {
    if (this.score === undefined || this.score === null || isNaN(this.score) || this.score < 0) {
      this.score = 0;
    }
  }
}
