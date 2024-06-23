import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  IndiceService {


  public hint: boolean;
  hintText: string | undefined;
  hintImageUrl: string | undefined;
  public hintAudio: HTMLAudioElement | null = null;

  constructor() {
    this.hint = JSON.parse(localStorage.getItem('hint') ?? 'false');
  }


  setIndice(hint: { text?: string | undefined; imageUrl?: string | undefined; audioUrl?: string | undefined } | undefined) {
    if (hint) {
       
        if (hint.text !== undefined) {
            this.hintText = hint.text;
        }
        if (hint.imageUrl !== undefined) {
            this.hintText = "A quoi te fais penser cette photo?"
            this.hintImageUrl = hint.imageUrl;
        }
        if (hint.audioUrl !== undefined) {
            this.hintText="     A quoi te fait penser ce son?   "
            if (hint.audioUrl) {
                this.hintAudio = new Audio(hint.audioUrl);
            } else {
                
                this.hintAudio = null;
            }
        }
    } else {
       
        this.hintText = undefined;
        this.hintImageUrl = undefined;
        this.hintAudio = null;
    }
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
    this.sauvegarderIndiceState(!this.hint);
  }


  private sauvegarderIndiceState(indiceOn: boolean) {
    this.hint = indiceOn;
    localStorage.setItem('indiceOn', JSON.stringify(this.hint));
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