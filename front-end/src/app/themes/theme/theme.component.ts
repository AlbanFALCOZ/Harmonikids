import { Component, Input, OnInit } from '@angular/core';
import { Theme } from 'src/models/theme.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent implements OnInit{

  @Input()
  theme? : Theme

  ngOnInit(): void {
  }

  constructor() {
        
  }

}
