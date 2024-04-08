import { Component } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { Theme } from 'src/models/theme.model';
import { QuizService } from 'src/services/quiz.service';
import { ThemeService } from 'src/services/theme.service';
import { TitleService } from 'src/services/title.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.scss'
})
export class StatistiqueComponent {

  public themeList: Theme[] = [];
  public quizList: Quiz[] = [];

  constructor(public themeService: ThemeService, public quizService: QuizService,) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }



}
