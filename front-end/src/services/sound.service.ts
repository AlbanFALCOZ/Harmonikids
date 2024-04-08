import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SonService {
  
  private sonActif: boolean;
  private musicActif: boolean;
  private audio: HTMLAudioElement;


  constructor() {
    this.sonActif = JSON.parse(localStorage.getItem('sonActif') ?? 'true');
    this.musicActif = JSON.parse(localStorage.getItem('musicActif') ?? 'true');
    this.audio = new Audio();
    
    
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

  
 

  isMusiqueActive(): boolean {
    return this.musicActif;
  }

  toggleMusique() {
    this.sauvegarderMusiqueState(!this.musicActif);
  }

 
  playSound(soundUrl: string) {
    if (this.sonActif) {
      const audio = new Audio(soundUrl);
      audio.play();
    }
  }

 
  playMusic(musicUrl: string) {
    if (this.musicActif) {
      this.audio.src = musicUrl; 
      this.audio.play();
    }
  }


  private sauvegarderSonState(sonActif: boolean) {
    this.sonActif = sonActif;
    localStorage.setItem('sonActif', JSON.stringify(sonActif));
  }

  private sauvegarderMusiqueState(musicActif: boolean) {
    this.musicActif = musicActif;
    localStorage.setItem('musicActif', JSON.stringify(musicActif));
  }

  stopMusic() {
    this.audio.pause(); 
    this.audio.currentTime = 0; 
  }


  

}
