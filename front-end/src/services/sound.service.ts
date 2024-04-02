import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SonService {
  private sonActif: boolean;

  constructor() {
    this.sonActif = JSON.parse(localStorage.getItem('sonActif') ?? 'true');
  }

  activerSon() {
    this.sauvegarderSonState(true);
  }

  desactiverSon() {
    this.sauvegarderSonState(false);
  }

  estSonActif(): boolean {
    return this.sonActif;
  }

  toggleSon() {
    this.sauvegarderSonState(!this.sonActif);
  }

  playSound(soundUrl: string) {
    if (this.sonActif) {
      const audio = new Audio(soundUrl);
      audio.play();
    }
  }

  private sauvegarderSonState(sonActif: boolean) {
    this.sonActif = sonActif;
    localStorage.setItem('sonActif', JSON.stringify(sonActif));
  }
}
