import { Component, Input } from '@angular/core';
import { Game } from 'src/models/game.model';
import { Quiz } from 'src/models/quiz.model';
import { Theme } from 'src/models/theme.model';
import { GameService } from 'src/services/game.service';
import { MembreService } from 'src/services/membre.service';
import { QuizService } from 'src/services/quiz.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-statistique-card',
  templateUrl: './statistique-card.component.html',
  styleUrl: './statistique-card.component.scss'
})
export class StatistiqueCardComponent {

  @Input() theme!: Theme;
  
  quizList!: Quiz[];
  quizListSorted!: Quiz[];
  
  numberOfQuizzes!: number;
  numberOfQuizzesFinished!: number;
  numberOfquizzesInProgress: number = 0;
  memberId: number = 0;
  games: Game[] = [];

  constructor(private quizService: QuizService, private gameService: GameService, private membreService: MembreService) {    

   }

  ngOnInit(): void {
    this.loadStatTheme();
  }

  
  ngOnChanges(): void { 
    this.loadStatTheme();
  }

  loadStatTheme(): void {
    this.memberId = this.membreService.getMemberId();
    this.gameService.getGamesByChildId(this.memberId).then(childGames => {
      this.games = childGames;

      const quizIds = this.games.map(game => game.quizId);

      this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
        this.quizList = quizzes.filter(quiz => quizIds.includes(quiz.id));
        this.quizListSorted = this.quizList;

        this.numberOfQuizzes = this.quizList.filter(quiz => quiz.theme == this.theme.name).length;
        this.numberOfQuizzesFinished = this.quizListSorted.filter(quiz => quiz.theme == this.theme.name && quiz.statut == 'Terminé').length;

      });
    });
  }


  calculatePercentage(numberOfQuizzesFinished: number, numberOfQuizzes: number): number {
    if (numberOfQuizzesFinished === 0) {
      return 0;
    }

    const percentage = (numberOfQuizzesFinished / numberOfQuizzes) * 100;
    return Math.round(percentage);
  }
}
