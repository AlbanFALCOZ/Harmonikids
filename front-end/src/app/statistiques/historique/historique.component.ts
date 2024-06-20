import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/models/game.model';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { GameService } from 'src/services/game.service';
import { MembreService } from 'src/services/membre.service';
import { QuestionService } from 'src/services/question.service';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  games: Game[] = [];
  quizzes: Quiz[] = [];
  questions: Question[] = [];
  memberId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private quizService: QuizService,
    private questionService: QuestionService,
    private membreService: MembreService
  ) { }

  ngOnInit(): void {
    this.memberId = this.membreService.getMemberId();

    this.gameService.getGamesByChildId(this.memberId).then(games => {
      this.games = games;
    });

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizzes = quizzes;
    });

    this.questionService.questions$.subscribe(questions => {
      this.questions = questions;
    });
  }

  getQuestionIds(game: Game): number[] {
    return Object.keys(game.chosenAnswers).map(key => +key);
  }

  getQuestion(id: number): String | undefined {
    return this.questions.find(q => q.id === id)?.label;
  }
}
