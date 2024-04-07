import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../../../models/question.model';
import { QuestionService } from '../../../services/question.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  public questionList: Question[] = [];

  currentQuestionIndex: number = 0;

  constructor(private questionService: QuestionService) { 
    this.questionService.questions$.subscribe((sortedQuestions: Question[]) => {
      this.questionList = sortedQuestions;
    });
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
  
  

}
