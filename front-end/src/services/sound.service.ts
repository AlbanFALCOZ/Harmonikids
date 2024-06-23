import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SonService {
  
  private sonActif: boolean;
  private musicActif: boolean;
  private audio: HTMLAudioElement;


  constructor() {
    this.sonActif = JSON.parse(localStorage.getItem('sonActif') ?? 'false');
    this.musicActif = JSON.parse(localStorage.getItem('musicActif') ?? 'false');
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
    this.sonActif = !this.sonActif;
    if(this.sonActif){
      this.activerSon
    }else{
      this.desactiverSon
    }
  }
  
  toggleMusique() {
  
    const newMusicState = !this.musicActif;
    this.sauvegarderMusiqueState(newMusicState); 
  }
  
  
 

  isMusiqueActive(): boolean {
    return this.musicActif;
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
