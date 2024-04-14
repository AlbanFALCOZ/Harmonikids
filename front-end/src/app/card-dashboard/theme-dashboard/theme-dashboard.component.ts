
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Theme } from 'src/models/theme.model';

@Component({
  selector: 'app-theme-dashboard',
  templateUrl: './theme-dashboard.component.html',
  styleUrl: './theme-dashboard.component.scss'
})
export class ThemeDashboardComponent {

  
  @Input()
  theme?: Theme

  @Output()
  themeSelected: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {

  }

  ngOnInit(): void {
  }

  selectTheme(): void {
      this.themeSelected.emit(true);
  }


}
