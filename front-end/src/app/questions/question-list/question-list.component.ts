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
    
    const allCorrect = this.selectedAnswer.every(answer => answer.isCorrect);
    const anyIncorrect = this.selectedAnswer.some(answer => !answer.isCorrect);

    if (allCorrect && !anyIncorrect) {
      console.log('Toutes les réponses sélectionnées sont correctes.');
      // Logique pour le succès, comme passer à la question suivante
    } else {
      console.log('Certaines réponses sélectionnées sont incorrectes.');
      // Logique pour la réponse incorrecte, comme donner une autre chance
    }
  }

  onAnswerSelected(answer: Answer[]): void {
    this.selectedAnswer = answer;
  }
}
