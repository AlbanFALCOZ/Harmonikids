import { Component } from '@angular/core';
import { SonService } from 'src/services/sound.service';
import { ColorService } from 'src/services/color-service.service';
import { Theme } from '../../models/theme.model';
import { TitleService } from 'src/services/title.service';
import { ThemeService } from 'src/services/theme.service';
import { Question } from 'src/models/question.model';


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

  

  themeList: Theme[] = [];
  showDropdown: boolean = false;
  isSoundOn: boolean;
  isMusicOn: boolean =false;
  isIndiceOn:boolean=false;
  selectedOption: string = 'option1';

  constructor(private sonService: SonService , private colorService: ColorService , private themeService: ThemeService) {
    
    this.isSoundOn = this.sonService.estSonActif();
  }

  ngOnInit() {
    this.themeList = this.themeService.getThemes()
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

  selectedThemes: string[] = [];

  onChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      if (this.selectedThemes.length < 4 && !this.selectedThemes.includes(value)) {
        this.selectedThemes.push(value);
      } else {
        event.target.checked = false;
      }
    } else {
      const index = this.selectedThemes.indexOf(value);
      if (index !== -1) {
        this.selectedThemes.splice(index, 1);
      }
    }
  }
  
  
  
}
