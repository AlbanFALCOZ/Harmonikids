import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { TitleService } from '../../../services/title.service';
import { QuestionService } from 'src/services/question.service';
import { NavbarService } from 'src/services/navbar.service';
import { ModeService } from 'src/services/mode-ergo.service';


@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  quizListDisplayed: Quiz[] = [];
  quizToDelete: Quiz | null = null;
  isDisabled: boolean = false;

  isNavVisible = false;
  search: string = '';

  public selectedQuiz: Quiz | null = null;

  constructor(private router: Router, public quizService: QuizService, public titleService: TitleService, public questionService: QuestionService, private navbarService: NavbarService, private modeService: ModeService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      this.quizListDisplayed = quizzes;
    });
    this.titleService.title = 'Liste des quiz';
    this.titleService.search = 'Rechercher dans les quiz...';
    
    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });

    this.modeService.isDisabled$.subscribe(isDisabled => {
      this.isDisabled = isDisabled;
    });
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
      this.quizService.deleteQuiz(this.quizToDelete);
    }

  }

  addQuizToDelete(quiz: Quiz): void {
    this.quizToDelete = quiz;
  }

  onKey(event: any) {
    this.quizListDisplayed = this.quizList.filter(quiz => quiz.name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

}
