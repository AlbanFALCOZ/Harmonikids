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
    console.log("onNiveauSelected : ", niveauName);
    this.niveauSelected.emit(niveauName);
    this.questions.forEach((question) => console.log(question.name, question.niveau));
    console.log("Questions length : ", this.questions.length);
    let filteredQuestions = this.questions;
    if (niveauName === 'Facile') {
        filteredQuestions = this.questions.filter(question => question.niveau === 'facile');
    } else if (niveauName === 'Moyen') {
        filteredQuestions = this.questions.filter(question => question.niveau === 'facile' || question.niveau === 'moyen');
    }
    console.log("Filtered questions by level length : ", filteredQuestions.length);
    this.quizService.setFilteredQuestions(filteredQuestions);
    this.quizService.setLevel(niveauName);
}
}
