import { Component } from '@angular/core';
import { SonService } from 'src/services/sound.service';
import { ColorService } from 'src/services/color-service.service';


enum ThemePalette {
  BLUE = 'light',
  GREEN = 'dark',
  PINK = 'contrast'
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {

  

  
  showDropdown: boolean = false;
  isSoundOn: boolean;
  isMusicOn: boolean =false;
  isIndiceOn:boolean=false;
  selectedOption: string = 'option1';

  constructor(private sonService: SonService , private colorService: ColorService ) {
    
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

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    
  }

  isDropdownOpen: boolean = false;


  colorOptions: { palette: ThemePalette, colors: string[] }[] = [
    { palette: ThemePalette.BLUE, colors: ['#59D5E0', '#FAA300'] },
    { palette: ThemePalette.GREEN, colors: ['#C1F2B0', '#FFB534'] },
    { palette: ThemePalette.PINK, colors: ['#F4538A', '#1E1E1E'] }
  ]; 

  

  selectColor(color: string) {
    this.colorService.selectedColor = color; 
    this.isDropdownOpen = false; 
  }
}
