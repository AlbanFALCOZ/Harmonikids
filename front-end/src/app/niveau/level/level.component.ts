import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QUESTION_LIST } from 'src/mocks/question.mock';
import { Question } from 'src/models/question.model';
import { FilteredQuestionService } from 'src/services/filteredQuestions.service';
import { NavbarService } from 'src/services/navbar.service';
import { QuestionService } from 'src/services/question.service';
import { QuizService } from 'src/services/quiz.service';
import { TitleService } from 'src/services/title.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent implements OnInit {
  
  public questionList: Question[] = [];
  quizId!: number;
  quizQuestions: Question[] = [];
  filteredQuestions: Question[] = [];

  isNavVisible = false;


  constructor(private route: ActivatedRoute, public questionService: QuestionService, private quizService: QuizService, private filteredQuestionService: FilteredQuestionService, private navbarService: NavbarService) {
    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });
    this.questionList = this.questionService.getQuestionsFromLocalStorage();
    if (this.questionList.length === 0) {
      this.questionService.questions$.subscribe((questions: Question[]) => {
        this.questionService.saveQuestionsToLocalStorage(questions);
      });
    }

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizId = +params['id'];
    });
  }

  
}
