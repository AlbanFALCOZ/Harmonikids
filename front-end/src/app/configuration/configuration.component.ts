import { Component } from '@angular/core';
import { SonService } from 'src/services/sound.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {

  

  isSoundOn: boolean;
  isMusicOn: boolean =false;
  isIndiceOn:boolean=false;

  constructor(private sonService: SonService) {
    
    this.isSoundOn = this.sonService.estSonActif();
  }

  toggleSound() {
    this.sonService.toggleSon();
    this.isSoundOn = this.sonService.estSonActif();
  }

  toggleMusic() {
    this.sonService.toggleMusique();
    this.isMusicOn = this.sonService.isMusiqueActive();
    if (this.isMusicOn) {
      
      this.sonService.playMusic('/assets/img/music.mp3');
    } else {
      
      this.sonService.stopMusic();
    }
  }

  toggleIndice(){
  }
}
