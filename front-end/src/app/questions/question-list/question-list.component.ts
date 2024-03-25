import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../../../models/question.model';
import { QuestionService } from '../../../services/question.service';
import { TitleService } from '../../../services/title.service';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  public questionList: Question[] = [];

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
    console.log('Validation de la réponse pour la question actuelle');
    
    // Ajoutez ici la logique de validation des réponses pour la question actuelle.
    // Par exemple, vous pouvez envoyer la réponse à un service et vérifier si elle est correcte.
    
  }
}
