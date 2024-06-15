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
  constructor(private themeService: ThemeService) {}


  getQuizCountByTheme(themeId: string): number {
    const quizzes = this.themeService.getQuizzesByTheme(themeId);
    const completedQuizzes = quizzes.filter(quiz => quiz.status === 'terminé');
    return completedQuizzes.length;
  }
}
