import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question, Answer } from '../../../models/question.model';
import { QuestionService } from '../../../services/question.service';
import { QuestionType } from '../../../models/question.model';
import { TitleService } from '../../../services/title.service';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  public questionList: Question[] = [];
  selectedAnswer: Answer[] = [];
  currentQuestionIndex: number = 0;
  QuestionType = QuestionType;
  showSuccessMessage: boolean = false;
  showFailureMessage: boolean = false;


  constructor(private router: Router, public questionService: QuestionService) {
    this.questionService.questions$.subscribe((questions: Question[]) => {
      this.questionList = questions;
    });

  }

  ngOnInit(): void {
    console.log(this.questionList)
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questionList.length - 1) {
      this.currentQuestionIndex++;
      this.showSuccessMessage = false;
      this.showFailureMessage = false;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showSuccessMessage = false;
      this.showFailureMessage = false;
    }
  }
  
  
  validateQuestion(): void {
    if (this.selectedAnswer.length === 0) {
      alert('Veuillez sélectionner au moins une réponse avant de valider.');
      return;
    }
  
    const currentQuestion = this.questionList[this.currentQuestionIndex];
    const correctAnswers = currentQuestion.answers.filter(a => a.isCorrect);
    
    this.showSuccessMessage = false;
    this.showFailureMessage = false;
  
    const selectedAreAllCorrect = this.selectedAnswer.every(sa => sa.isCorrect);
    const allCorrectAnswersSelected = correctAnswers.length === this.selectedAnswer.length &&
                                      correctAnswers.every(ca => this.selectedAnswer.some(sa => sa.value === ca.value));
  
    if (selectedAreAllCorrect && allCorrectAnswersSelected) {
      this.showSuccessMessage = true;
    } else {
      this.showFailureMessage = true;
    }
  
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.showFailureMessage = false;
    }, 6000); 
  }
  
  


  onAnswerSelected(answer: Answer[]): void {
    this.selectedAnswer = answer.filter(a => a.isSelected);  
    this.showSuccessMessage = false;
    this.showFailureMessage = false;
  }
}
