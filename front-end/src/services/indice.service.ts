import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  IndiceService {
  
  private hint: boolean;
  hintText: string | undefined;
  hintImageUrl: string | undefined;
  private hintAudio: HTMLAudioElement | null = null;



  constructor() {
    this.hint = JSON.parse(localStorage.getItem('sonActif') ?? 'true');
  }

  activerIndice() {
    this.sauvegarderIndiceState(true);
  }

  desactiverIndice() {
    this.sauvegarderIndiceState(false);
  }



  estIndiceActif(): boolean {
    return this.hint;
  }


  toggleIndiceService() {
    this.sauvegarderIndiceState(this.hint);
  }


  private sauvegarderIndiceState(indiceOn: boolean) {
    this.hint = indiceOn;
    localStorage.setItem('indiceOn', JSON.stringify(indiceOn));
  }

  showHint(hint: any) {
    if (this.hintAudio) {
      this.hintAudio.pause();
    }

    if (hint) {
      if (hint.audioUrl) {
        this.hintAudio = new Audio(hint.audioUrl);
        this.hintAudio.play();
      }
      this.hintText = hint.text;
      this.hintImageUrl = hint.imageUrl;
    }
  }



}