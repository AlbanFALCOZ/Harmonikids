import { Component, Input } from '@angular/core';
import { Theme } from 'src/models/theme.model';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-statistique-card',
  templateUrl: './statistique-card.component.html',
  styleUrl: './statistique-card.component.scss'
})
export class StatistiqueCardComponent {

  @Input() theme!: Theme;
  @Input() numberOfQuizzes!: number;
  @Input() numberOfQuizzesFinished!: number;
  constructor(private themeService: ThemeService) {}


  getQuizCountByTheme(theme: string): number {
    const quizzes = this.themeService.getQuizzesByTheme(theme);
    const completedQuizzes = quizzes.filter(quiz => quiz.statut === 'Terminé');
    return completedQuizzes.length;
  }

  calculatePercentage(numberOfQuizzesFinished: number, numberOfQuizzes: number): number {
    if (numberOfQuizzesFinished === 0) {
      return 0;
    }

    const percentage = (numberOfQuizzesFinished / numberOfQuizzes) * 100;
    return Math.round(percentage);
  }
}
