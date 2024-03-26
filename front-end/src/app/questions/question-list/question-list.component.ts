import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question, Answer } from '../../../models/question.model';
import { QuestionService } from '../../../services/question.service';
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
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
  
  
  validateQuestion(): void {
    if (this.selectedAnswer.length === 0) {
      alert('Veuillez sélectionner au moins une réponse avant de valider.');
      return;
    }
    const correctAnswers = this.questionList[this.currentQuestionIndex].answers.filter(a => a.isCorrect);
    const selectedIsCorrect = this.selectedAnswer.every(answer => 
      correctAnswers.some(correctAnswer => correctAnswer.value === answer.value && correctAnswer.isCorrect)
    );

    if (selectedIsCorrect) {
      alert('Bravo ! La réponse est correcte.');
    } else {
      alert('Dommage. La réponse est incorrecte.');
    }
  }


  onAnswerSelected(answer: Answer[]): void {
    this.selectedAnswer = answer.filter(a => a.isSelected);  }
}
