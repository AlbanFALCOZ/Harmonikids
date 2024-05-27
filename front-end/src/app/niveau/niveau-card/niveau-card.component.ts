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
    this.niveauSelected.emit(niveauName);
    const filteredQuestions = this.questions.filter(question => question.niveau === niveauName);
    this.quizService.setFilteredQuestions(filteredQuestions);
  }
}
