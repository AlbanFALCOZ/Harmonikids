import { Component, Input } from '@angular/core';
import { Theme } from 'src/models/theme.model';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-statistique-card',
  templateUrl: './statistique-card.component.html',
  styleUrl: './statistique-card.component.scss'
})
export class StatistiqueCardComponent {

  @Input()
  theme!: Theme;
}
