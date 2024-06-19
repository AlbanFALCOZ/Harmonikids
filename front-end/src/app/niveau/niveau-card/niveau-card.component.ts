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
    console.log("onNiveauSelected : ", niveauName);
    this.niveauSelected.emit(niveauName);
    this.questions.forEach((question) => console.log(question.name, question.niveau));
    console.log("Questions length : ", this.questions.length);
    let filteredQuestions = this.questions;
    if (niveauName === 'facile') {
        filteredQuestions = this.questions.filter(question => question.niveau === 'Facile');
    } else if (niveauName === 'moyen') {
        filteredQuestions = this.questions.filter(question => question.niveau === 'Facile' || question.niveau === 'Moyen');
    }
    console.log("Filtered questions by level length : ", filteredQuestions.length);
    this.quizService.setFilteredQuestions(filteredQuestions);
    this.quizService.setLevel(niveauName);
}
}
