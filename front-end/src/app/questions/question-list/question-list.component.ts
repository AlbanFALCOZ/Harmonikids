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
  public selectedAnswer?: Answer;
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
  
  
  validateQuestion() {
    if (this.selectedAnswer) {
      // Validez la réponse ici
      console.log('Réponse validée:', this.selectedAnswer);
      // Puis passez à la prochaine question ou affichez les résultats
    } else {
      // Si aucune réponse n'est sélectionnée, informez l'utilisateur
      alert('Veuillez sélectionner une réponse avant de valider.');
    }
    
  }

  // Cette méthode est appelée lorsque l'enfant émet une réponse sélectionnée
  onAnswerSelected(answer: Answer) {
    this.selectedAnswer = answer;
  }
}
