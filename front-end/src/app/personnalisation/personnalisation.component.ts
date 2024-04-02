import { Component } from '@angular/core';
import { ColorService } from 'src/services/color-service.service';


enum ThemePalette {
  BLUE = 'light',
  GREEN = 'dark',
  PINK = 'contrast'
}

@Component({
  selector: 'app-personnalisation',
  templateUrl: './personnalisation.component.html',
  styleUrls: ['./personnalisation.component.scss']
})
export class PersonnalisationComponent {
  isDropdownOpen: boolean = false;


  colorOptions: { palette: ThemePalette, colors: string[] }[] = [
    { palette: ThemePalette.BLUE, colors: ['#59D5E0', '#FAA300'] },
    { palette: ThemePalette.GREEN, colors: ['#C1F2B0', '#FFB534'] },
    { palette: ThemePalette.PINK, colors: ['#F4538A', '#1E1E1E'] }
  ]; 

  constructor(private colorService: ColorService) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectColor(color: string) {
    this.colorService.selectedColor = color; 
    this.isDropdownOpen = false; 
  }
  
}
