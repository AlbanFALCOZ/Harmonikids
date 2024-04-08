import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../../../models/question.model';
import { QuestionService } from '../../../services/question.service';
import { Subscription } from 'rxjs';
import { TitleService } from '../../../services/title.service';
import { ScoreService } from './score-service-component';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  public questionList: Question[] = [];

  currentQuestionIndex: number = 0;
  
  public numberOfQuestionsAnswered: number = 0;
  public numberOfCorrectAnswers: number = 0;


  constructor(private router: Router, public questionService: QuestionService, private scoreService: ScoreService) {
    this.questionService.questions$.subscribe((questions: Question[]) => {
      this.questionList = questions;
    });
    this.scoreService.numberOfQuestionsAnswered$.subscribe(score1 => {
      this.numberOfQuestionsAnswered = score1;
    });
    this.scoreService.numberOfCorrectAnswers$.subscribe(score2 => {
      this.numberOfCorrectAnswers = score2;
    })

  }

  // constructor(private filteredQuestionService: FilteredQuestionService) {
  //   this.filteredQuestionService.filteredQuestions$.subscribe((sortedQuestions: Question[]) => {
  //     this.questionList = sortedQuestions;
  //   });
  // }

  ngOnInit(): void {
    console.log(this.questionList)
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questionList.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
  
  generateArray(num: number): any[] {
    if (num > 12) num = 12;
    return Array(num);
  }

}
