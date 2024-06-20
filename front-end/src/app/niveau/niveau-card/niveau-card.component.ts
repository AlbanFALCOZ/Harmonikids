import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-niveau-card',
  templateUrl: './niveau-card.component.html',
  styleUrl: './niveau-card.component.scss'
})
export class NiveauCardComponent {
  @Input() niveauName: string = '';

  @Input() questions: any[] = [];

  @Output() niveauSelected: EventEmitter<string> = new EventEmitter<string>();


  constructor(private quizService: QuizService) { }

  onNiveauSelected(niveauName: string): void {
    niveauName = niveauName.toLocaleLowerCase();
    this.niveauSelected.emit(niveauName);
    let filteredQuestions = this.questions;
    if (niveauName === 'facile') {
        filteredQuestions = this.questions.filter(question => question.niveau === 'Facile');
    } else if (niveauName === 'moyen') {
        filteredQuestions = this.questions.filter(question => question.niveau === 'Facile' || question.niveau === 'Moyen');
    }
    if (filteredQuestions.length == 0) {
      filteredQuestions.push(this.questions.at(0));
    }
    this.quizService.setFilteredQuestions(filteredQuestions);
    this.quizService.setLevel(niveauName);
}
}
