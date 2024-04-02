import { Component } from '@angular/core';
import { SonService } from 'src/services/sound.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {

  isSoundOn: boolean;

  constructor(private sonService: SonService) {
    
    this.isSoundOn = this.sonService.estSonActif();
  }

  toggleSound() {
    this.sonService.toggleSon();
    this.isSoundOn = this.sonService.estSonActif();
  }
}
