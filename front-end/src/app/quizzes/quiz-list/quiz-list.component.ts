import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { TitleService } from '../../../services/title.service';
import { QuestionService } from 'src/services/question.service';


@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  quizToDelete: Quiz | null = null;
  isDisabled: boolean = false;

  public selectedQuiz: Quiz | null = null;

  constructor(private router: Router, public quizService: QuizService, public titleService: TitleService, public questionService: QuestionService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    this.titleService.title = 'Liste des quiz';
    this.titleService.search = 'Rechercher dans les quiz...';
  }

  ngOnInit(): void {

  }

  quizSelected(quiz: Quiz): void {
    const quizQuestions = quiz.questions;
    this.questionService.updateQuestionsForQuiz(quizQuestions);
  }

  editQuiz(quiz: Quiz): void {
    this.router.navigate(['/edit-quiz/' + quiz.name]);
  }

  deleteQuiz(): void {
    if (this.quizToDelete) {
      this.quizList = this.quizList.filter(quiz => quiz != this.quizToDelete);

    }
  }

  addQuizToDelete(quiz: Quiz): void {
    this.quizToDelete = quiz;
  }


}
