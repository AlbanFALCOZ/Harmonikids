import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/models/game.model';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { GameService } from 'src/services/game.service';
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

  constructor(private route: ActivatedRoute, private gameService: GameService, private quizService: QuizService, private questionService: QuestionService) {
    this.gameService.games$.subscribe(games => {
      this.games = games.filter(game => game.childId === 123);
    });

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizzes = quizzes;
    });

    this.questionService.questions$.subscribe(questions => {
      this.questions = questions;
      console.log("1",this.questions);
    });
   }

  ngOnInit(): void {
  }

  getQuestionIds(game: Game): number[] {
    return Object.keys(game.chosenAnswers).map(key => +key);
  }

  getQuestion(id: number): String | undefined {
    console.log(this.questions);
    return this.questions.find(q => q.id === id)?.label;
  }


}